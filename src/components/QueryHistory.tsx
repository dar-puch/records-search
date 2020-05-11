import * as React from "react";
import { HistoryItem, updateHistory } from "../utils/api";
import { Button, ListItem, ListItemText, Typography } from "@material-ui/core";

export interface IQueryHistory {
  history: HistoryItem[];
  clear: () => void;
  update: (id: string) => void;
}

export const QueryHistory: React.FC<IQueryHistory> = ({
  history,
  clear,
  update,
}) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        Query History
      </Typography>
      <Button
        id="button_clear"
        variant="contained"
        color="primary"
        onClick={clear}
      >
        Clear history
      </Button>
      <div>
        {history.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="body1" gutterBottom={true}>
                {item.parameters && item.parameters.what} ={" "}
                {item.parameters && item.parameters.queryString}
                <br />
                {item.date}
                <br />
              </Typography>
            </ListItemText>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => update(item.queryId)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </div>
    </div>
  );
};
