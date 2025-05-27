import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Lightbox from "yet-another-react-lightbox";
import { MasonryPhotoAlbum } from "react-photo-album";

import "react-photo-album/masonry.css";
import styles from "./Event.module.css";
import NavbarElement from "../../components/design/navbar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Nautico } from "../../../models";

export default function View() {
  return (
    <div>
      <NavbarElement />
      <div className={styles["view"]}>
        <div className={styles["gallery"]}>
          {/* <h1>Galeria de Eventos</h1> */}
          <SelectedEvent id={1} />
        </div>
      </div>
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
      <h1>{name}</h1>
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
  const [slides, setSlides] = useState<Array<Slide>>([]);
  const { loading, error, data } = useQuery<{ fileGroup: Nautico.FileGroup }>(
    GET_FILEGROUP,
    {
      variables: {
        id: fileGroupId,
      },
    },
  );

  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (!data) return;
    const {
      fileGroup: { files },
    } = data;
    async function getDimensions(files: Array<Nautico.File>) {
      const response: Array<Slide> = [];
      for (const { url } of files) {
        const { width, height } = await getImageDimensions(url);
        response.push({ width, height, src: url });
      }

      setSlides(response);
    }

    getDimensions(files);
  }, [data, loading, error]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>${error.message}</div>;
  }

  if (!slides.length) {
    return null;
  }

  return (
    <div className={styles["images"]}>
      <Gallery slides={slides} />
    </div>
  );
}

function Gallery({ slides }: { slides: Array<Slide> }) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <MasonryPhotoAlbum
        photos={slides}
        onClick={({ index: current }) => {
          console.log(`I click the index: `, index);
          setIndex(current);
        }}
        sizes={{
          size: "1168px",
          sizes: [
            {
              viewport: "(max-width: 1200px)",
              size: "calc(100vw - 32px)",
            },
          ],
        }}
      />
      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
}

async function getImageDimensions(src: string) {
  return new Promise<Dimensions>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = src;
  });
}

interface Dimensions {
  width: number;
  height: number;
}

interface Slide {
  src: string;
  width: number;
  height: number;
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
