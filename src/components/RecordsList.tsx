import React from "react";
import { Release } from "../utils/api";
import {
  Box,
  GridList,
  GridListTile,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

interface IRecordsList {
  list: Release[];
}

export const RecordsList: React.FC<IRecordsList> = ({ list }) => (
  <GridList cellHeight={350} cols={9} spacing={6}>
    {list.map((item, index) => (
      <GridListTile cols={2} key={index}>
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
              <Typography gutterBottom={true} variant="body1">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                cat number: {item.catno} <br /> year: {item.year}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </GridListTile>
    ))}
  </GridList>
);
