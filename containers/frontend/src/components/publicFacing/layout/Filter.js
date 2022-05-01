import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

// // simple filter
// export default function Filter() {
//   return (
//     <Autocomplete
//       id="filter-demo"
//       options={familyName}
//       getOptionLabel={(option) => option.title}
//       filterOptions={filterOptions}
//       style={{ width: 300 }}
//       renderInput={(params) =>
//         <TextField  {...params}
//         label="Enter a keyword, family name, or animation name"
//         variant="outlined"
//         fullWidth/>}
//     />
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function multipleFilter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="country"
        options={country}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select a country"
            placeholder="Country"
          />
        )}
      />
      <Autocomplete
        multiple
        id="familyName"
        options={familyName}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="enter a family name"
            placeholder="Family Name"
          />
        )}
      />
      <TextField
        fullWidth
        helperText="enter a keyword"
        variant="outlined"
        id="keyword"
      />
    </div>
  );
}

const country = [
  { title: "Germany" },
  { title: "Poland" },
  { title: "Australia" },
];
const familyName = [
  { title: "The A", country: "Germany" },
  { title: "The B", country: "Poland" },
  { title: "The C", country: "Poland" },
  { title: "The D", country: "Australia" },
];
