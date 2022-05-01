import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  SvgIcon,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { SelectChangeEvent } from '@mui/material/Select';

const SearchFilterToolbar = (props) => {
  const [search, setSearch] = useState("");
  const [item, setChoose] = useState("");
  // const [searchAdd, setSearchAdd] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    poland: true,
    germany: true,
    australia: true,
  });

  const onSearchChange = (newValue) => {
    props.handleonsearchchange(newValue, item, selectedCheckboxes);
    setSearch(newValue);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChoose(event.target.value);
  };


  const onCheckboxChange = (event) => {
    props.handleonsearchchange(search, item, {
      ...selectedCheckboxes,
      [event.target.name]: event.target.checked,
    });
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };


  return (
    <Card>
      <CardContent>
        <Box sx={{ width: "98.5%" }}>
          <TextField
            fullWidth
//            placeholder={`Search ${props.resourceType}`}
			      placeholder={`Search ${item}`}
            variant="outlined"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FormControl sx={{ m: 2, minWidth: 360 }}>
            <InputLabel id="choose-item">Search</InputLabel>
            <Select
              labelId="choose-item"
              id="simple-select"
              value={item}
              label="What For Search"
              onChange={handleChange}
            >
              <MenuItem value={'FamilyName'}>FamilyName</MenuItem>
              {/* <MenuItem value={'Country'}>Country</MenuItem> */}
              <MenuItem value={'Address'}>Address</MenuItem>
              <MenuItem value={'FamilyMembers'}>FamilyMembers</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {props.resourceType == "Flowers" ? (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={selectedCheckboxes.poland}
                  onChange={onCheckboxChange}
                  name="poland"
                />
              }
              label="Poland"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={selectedCheckboxes.germany}
                  onChange={onCheckboxChange}
                  name="germany"
                />
              }
              label="Germany"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={selectedCheckboxes.australia}
                  onChange={onCheckboxChange}
                  name="australia"
                />
              }
              label="Australia"
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

// const SearchAddressFilterToolbar = (props) => {
//   const [searchAdd, setSearchAdd] = useState("");
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState({
//     poland: true,
//     germany: true,
//     australia: true,
//   });


//   const onSearchAddChange = (newValue) => {
//     props.handleonsearchchange(newValue, selectedCheckboxes);
//     setSearchAdd(newValue);
//   };

//   const onCheckboxChange = (event) => {
//     props.handleonsearchchange(searchAdd, {
//       ...selectedCheckboxes,
//       [event.target.name]: event.target.checked,
//     });
//     setSelectedCheckboxes({
//       ...selectedCheckboxes,
//       [event.target.name]: event.target.checked,
//     });
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Box sx={{ width: "98.5%" }}>
// 		      <TextField
//             fullWidth
// 			      placeholder={`Search Address`}
//             variant="outlined"
//             id="searchAddress"
//             value={searchAdd}
//             onChange={(e) => onSearchAddChange(e.target.value)}
//           />
//         </Box>
//         {props.resourceType == "Flowers" ? (
//           <>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={selectedCheckboxes.poland}
//                   onChange={onCheckboxChange}
//                   name="poland"
//                 />
//               }
//               label="Poland"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={selectedCheckboxes.germany}
//                   onChange={onCheckboxChange}
//                   name="germany"
//                 />
//               }
//               label="Germany"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={selectedCheckboxes.australia}
//                   onChange={onCheckboxChange}
//                   name="australia"
//                 />
//               }
//               label="Australia"
//             />
//           </>
//         ) : null}
//       </CardContent>
//     </Card>
//   );
// };


export { SearchFilterToolbar };
// export { SearchAddressFilterToolbar };
