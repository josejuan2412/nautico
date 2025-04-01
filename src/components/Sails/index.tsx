import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Nautico } from "../../../models";

const DT_FORMAT = "yyyy LLL dd, h:mm:a";

import styles from "./Sails.module.css";
export function Sails({ start, end }: SalesProps) {
  if (!start) {
    start = DateTime.now()
      .minus({ days: 7 })
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toJSDate();
  }

  if (!end) {
    end = DateTime.now()
      .set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 59,
      })
      .toJSDate();
  }
  const { loading, error, data } = useQuery<{ sails: Array<Nautico.Sail> }>(
    GET_SAILS,
    {
      variables: {
        start,
        end,
      },
    },
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className={styles["error"]}>{error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const { sails } = data;

  return (
    <div className={styles["sails"]}>
      <Table className="max-w-5xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Embarcacion</TableHead>
            <TableHead>Capitán</TableHead>
            <TableHead>Tripulacion</TableHead>
            <TableHead className="w-[100px] text-left">Destino</TableHead>
            <TableHead className="text-right">Salida</TableHead>
            <TableHead className="text-right">Entrada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sails.map((sail) => {
            const { id, boat, captain, crew, destination, departure, arrival } =
              sail;
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{boat}</TableCell>
                <TableCell>{captain}</TableCell>
                <TableCell>{crew}</TableCell>
                <TableCell className="w-[100px] text-left">
                  {destination}
                </TableCell>
                <TableCell className="text-right">
                  {DateTime.fromJSDate(new Date(`${departure}`)).toFormat(
                    DT_FORMAT,
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {DateTime.fromJSDate(new Date(`${arrival}`)).toFormat(
                    DT_FORMAT,
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function Loading() {
  return (
    <div className={styles["loading"]}>
      <Spinner size="large" />
    </div>
  );
}

interface SalesProps {
  start?: Date;
  end?: Date;
}

const GET_SAILS = gql`
  query GetSails(
    $start: Date!
    $end: Date!
    $direction: Direction
    $filterBy: SailFilterBy
  ) {
    sails(
      start: $start
      end: $end
      direction: $direction
      filterBy: $filterBy
    ) {
      id
      boat
      captain
      crew
      destination
      departure
      arrival
    }
  }
`;
