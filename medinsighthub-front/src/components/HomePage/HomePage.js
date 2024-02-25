import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
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
import { getAll, deleteMedicalRecord, update, create } from '../../services/medicalRecordService';
import { getValidateToken } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

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
			<Button color='primary' startIcon={<AddIcon />} onClick={handleClick} disabled={props.role === 'Viewer'}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
};

const HomePage = () => {
	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});
	const [role, setRole] = React.useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getAll().then(res => {
			setRows(res.data);
		});

		getValidateToken(localStorage.getItem('medhub-token')).then(response => {
			setRole(response.data.roles[0]);
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
		if (newRow?.isNew) create(newRow);
		else update(newRow);

		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = newRowModesModel => {
		setRowModesModel(newRowModesModel);
	};

	const handleLogout = () => {
		localStorage.removeItem('medhub-token');
		navigate('/login');
	};

	const columns = [
		{
			field: 'gender',
			headerName: 'Gender',
			width: 80,
			editable: role === 'Entry',
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
			editable: role === 'Entry',
		},
		{
			field: 'limfPercentage',
			headerName: 'Limf%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: role === 'Entry',
		},
		{
			field: 'midPercentage',
			headerName: 'Mid%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: role === 'Entry',
		},
		{
			field: 'granPercentage',
			headerName: 'Gran%',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: role === 'Entry',
		},
		{
			field: 'hgb',
			headerName: 'HGB',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: role === 'Entry',
		},
		{
			field: 'errbc',
			headerName: 'ER RBC',
			type: 'number',
			width: 80,
			align: 'left',
			headerAlign: 'left',
			editable: role === 'Entry',
		},
		{
			field: 'category',
			headerName: 'Category',
			width: 120,
			editable: true,
			type: 'singleSelect',
			valueOptions: ['Laka', 'Srednja', 'Teska'],
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

				let resultArray = [];

				resultArray.push(
					<GridActionsCellItem
						icon={<EditIcon />}
						label='Edit'
						className='textPrimary'
						onClick={handleEditClick(id)}
						color='inherit'
					/>
				);

				if (role === 'Entry')
					resultArray.push(
						<GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
					);

				return resultArray;
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
			<Grid container justifyContent="space-between" alignItems="center">
				<Box>
					<h1>MedInsightHUB</h1>
				</Box>
				<Box>
					<Button onClick={handleLogout}>LOGOUT</Button>
				</Box>
			</Grid>
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
					toolbar: { setRows, setRowModesModel, role },
				}}
				onProcessRowUpdateError={error => console.log(error)}
			/>
		</Box>
	);
};

export default HomePage;
