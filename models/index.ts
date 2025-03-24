export namespace Nautico {
  export interface Tournament {
    id: number;
    name: string;
    slug: string;
    position: number;
    date: Date;
    createdAt: Date;
  }

  export namespace Tournament {
    export interface Category {
      id: number;
      name: string;
      type: "points" | "weight";
      isLargest: boolean;
      createdAt: Date;
    }
    export interface Fisherman {
      id: number;
      name: string;
      isEnabled: boolean;
      createdAt: Date;
    }

    export interface Boat {
      id: number;
      name: string;
      createdAt: Date;
    }

    export interface Entry {
      id: number;
      value: number;
      date: Date;
    }
  }

  export interface FileGroup {
    id: number;
    name: string;
    directory: string;
    date: Date;
    files?: Array<File>;
  }

  export interface File {
    id: string;
    key: string;
    url: string;
    version: string;
    size: number;
    uploaded: Date;
  }

  export interface Event {
    id: number;
    name: string;
    position: number;
    date: Date;
  }
}
