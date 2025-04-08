import { gql, useQuery } from "@apollo/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Nautico } from "../../../models";

import styles from "./Event.module.css";

export default function View() {
  return (
    <div className={styles["view"]}>
      <h1>Events</h1>
      <Events />
    </div>
  );
}

function Events() {
  const { loading, error, data } = useQuery<{ events: Array<Event> }>(
    GET_EVENTS,
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

  const { events } = data;

  return (
    <div className={styles["events"]}>
      {events.map((e) => (
        <EventComponent {...e} />
      ))}
    </div>
  );
}

function EventComponent(event: Event) {
  const { name, fileGroups } = event;
  return (
    <div className={styles["event"]}>
      <h2>{name}</h2>
      <div>
        {fileGroups.map((f) => (
          <FileGroupComponent {...f} />
        ))}
      </div>
    </div>
  );
}

function FileGroupComponent(fileGroup: Nautico.FileGroup) {
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
}

interface Event extends Nautico.Event {
  fileGroups: Array<Nautico.FileGroup>;
}

const GET_EVENTS = gql`
  query Events {
    events {
      id
      name
      position
      date
      fileGroups {
        id
        name
        directory
        date
        files {
          id
          key
          url
          version
          size
        }
      }
    }
  }
`;
