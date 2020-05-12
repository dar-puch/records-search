import React from "react";
import { Release } from "../utils/api";
import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
interface IRecordsList {
  list: Release[];
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  }
}));


export const RecordsList: React.FC<IRecordsList> = ({ list }) => { 
  const classes = useStyles();
  return (
  <div className={classes.root}>
    {list.map((item, index) => (
      <Box width={200} height={300} m={3} key={index}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              width="200"
              image={item.cover_image}
              title={item.title}
            />
            <CardContent>
              <Box textOverflow="ellipsis" height={150}>
              <Typography gutterBottom={true} variant="body1">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                cat number: {item.catno} <br /> year: {item.year}
              </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    ))}
 </div>
);
    }
