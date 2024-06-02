import React from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

const BaseCard = (props) => {
  const { button } = props;
  return (
    <Card>
      <Box display="flex" alignItems="center" style={{justifyContent: "space-between"}}>
        <Typography variant="h4">{props.title}</Typography>
        <div>{button ? button : null}</div>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
