import React from "react";
import { randomId } from "@mui/x-data-grid-generator";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";

const EditToolbar = ({ setRows, setRowModesModel }) => {
	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
};

export default EditToolbar;
