import * as React from "react";
import { useState } from "react";
import { RecordsList } from "../RecordsList";
import { what, Release } from "../../utils/api";
import { ErrorInfo } from "../ErrorInfo";
import { QueryHistory } from "../QueryHistory";
import {
  Button,
  Input,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchArtist, useQueryHistory } from "../../utils/functions";

export enum responseStateValues {
  "idle",
  "loading",
  "success",
  "failure",
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  button: {
    margin: 20,
  },
}));

const App = (): JSX.Element => {
  const [recList, setRecList] = useState<Release[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [responseState, setResponseState] = useState<responseStateValues>(
    responseStateValues.idle
  );
  const {
    saveQuery,
    deleteHistoryItem,
    clearHistory,
    queryHistory,
  } = useQueryHistory();

  const classes = useStyles("root");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const saveSearchResult = async (what: what): Promise<void> => {
    setResponseState(responseStateValues.loading);
    try {
      const releases = await fetchArtist(inputValue, what);
      setRecList(releases);
      saveQuery(inputValue, what, releases);

      setResponseState(responseStateValues.success);
    } catch (error) {
      setError(error.message);
      setResponseState(responseStateValues.failure);
    }
  };

  const renderSwitch = (responseState: responseStateValues) => {
    switch (responseState) {
      case responseStateValues.loading:
        return (
          <div style={{ width: "90%", textAlign: "center" }}>
            {" "}
            <CircularProgress />{" "}
          </div>
        );
      case responseStateValues.success:
        return <RecordsList list={recList} />;
      case responseStateValues.failure:
        return <ErrorInfo error={error} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Records Search App</Typography>
        </Toolbar>
      </AppBar>
      <Box width="90%" m={4}>
        <Input
          onChange={handleInputChange}
          type="search"
          id="search"
          name="searchByArtist"
          data-value={inputValue}
        />
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={() => saveSearchResult("artist")}
        >
          By artist
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={() => saveSearchResult("label")}
        >
          By label
        </Button>
        <Box m={4}>{renderSwitch(responseState)}</Box>
        {queryHistory.length && (
          <QueryHistory
            clear={clearHistory}
            history={queryHistory}
            update={deleteHistoryItem}
          />
        )}
      </Box>
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar>
          <Typography variant="subtitle2">Puchweb 2020</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default App;
