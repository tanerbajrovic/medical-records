import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useEffect } from 'react';
import { getAll, get, deleteMedicalRecord, update, create } from '../../services/medicalRecordService';

const EditToolbar = props => {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = randomId();
		setRows(oldRows => [...oldRows, { id, name: '', age: '', isNew: true }]);
		setRowModesModel(oldModel => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
};

const HomePage = () => {
	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});

	useEffect(() => {
		getAll().then(res => {
			console.log(res.data);
			setRows(res.data);
		});
	}, []);

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = id => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = id => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = id => () => {
		setRows(rows.filter(row => row.id !== id));
		deleteMedicalRecord(id);
	};

	const handleCancelClick = id => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find(row => row.id === id);
		if (editedRow.isNew) {
			setRows(rows.filter(row => row.id !== id));
		}
	};

	const processRowUpdate = newRow => {
		if (newRow.isNew) create(newRow);
		else update(updatedRow);

		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = newRowModesModel => {
		setRowModesModel(newRowModesModel);
	};

	const columns = [
		{
			field: 'gender',
			headerName: 'Gender',
			width: 80,
			editable: true,
			type: 'singleSelect',
			valueOptions: ['1', '0'],
		},
		{
			field: 'lewbc',
			headerName: 'LE WBC',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'limfPercentage',
			headerName: 'Limf%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'midPercentage',
			headerName: 'Mid%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'granPercentage',
			headerName: 'Gran%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'hgb',
			headerName: 'HGB',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'errbc',
			headerName: 'ER RBC',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: true,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label='Save'
							sx={{
								color: 'primary.main',
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label='Cancel'
							className='textPrimary'
							onClick={handleCancelClick(id)}
							color='inherit'
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label='Edit'
						className='textPrimary'
						onClick={handleEditClick(id)}
						color='inherit'
					/>,
					<GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
				];
			},
		},
	];

	return (
		<Box
			sx={{
				height: 500,
				width: '100%',
				'& .actions': {
					color: 'text.secondary',
				},
				'& .textPrimary': {
					color: 'text.primary',
				},
			}}>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode='row'
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
		</Box>
	);
};

export default HomePage;
