import { gql, useQuery } from "@apollo/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Nautico } from "../../../models";

import styles from "./Event.module.css";
import { useState } from "react";

export default function View() {
  return (
    <div className={styles["view"]}>
      <h1>Events</h1>
      <SelectedEvent id={1} />
    </div>
  );
}

function SelectedEvent({ id }: SelectEventProps) {
  const { loading, error, data } = useQuery<{ event: Event }>(GET_EVENT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>${error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const { event } = data;

  const { fileGroups } = event;

  if (!fileGroups.length) {
    return (
      <div className={styles["events"]}>
        There are not images for this events
      </div>
    );
  }

  return (
    <div className={styles["events"]}>
      <EventComponent {...event} />
    </div>
  );
}

interface SelectEventProps {
  id: number;
}

function EventComponent({ name, fileGroups }: Event) {
  const [selected, setSelected] = useState(`${fileGroups[0].id}`);

  return (
    <div className={styles["event"]}>
      <h2>{name}</h2>
      <div>
        <Select onValueChange={setSelected} defaultValue={selected}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona el album" />
          </SelectTrigger>
          <SelectContent>
            {fileGroups.map((f) => (
              <SelectItem key={f.id} value={`${f.id}`}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <FilesComponent fileGroupId={selected} />
      </div>
    </div>
  );
}

function FilesComponent({ fileGroupId }: { fileGroupId: string }) {
  const { loading, error, data } = useQuery<{ fileGroup: Nautico.FileGroup }>(
    GET_FILEGROUP,
    {
      variables: {
        id: fileGroupId,
      },
    },
  );
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>${error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const {
    fileGroup: { files },
  } = data;

  return (
    <div className={styles["filegroup"]}>
      <div>
        {files.map((f) => {
          const { id, url } = f;
          return (
            <figure key={id} id={id} className="rounded-md object-cover">
              <img src={url} />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

/*function FileGroupComponent(fileGroup: Nautico.FileGroup) {
  const { name, files } = fileGroup;
  return (
    <div className={styles["filegroup"]}>
      <h3>{name}</h3>
      <div>
        {files.map((f) => {
          const { id, url } = f;
          return (
            <figure id={id} className="rounded-md object-cover">
              <img src={url} />
            </figure>
          );
        })}
      </div>
    </div>
  );
}*/

interface Event extends Nautico.Event {
  fileGroups: Array<Nautico.FileGroup>;
}

const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      fileGroups {
        id
        name
      }
    }
  }
`;

const GET_FILEGROUP = gql`
  query FileGroup($id: ID!) {
    fileGroup(id: $id) {
      id
      directory
      files {
        id
        key
        url
      }
      date
    }
  }
`;
