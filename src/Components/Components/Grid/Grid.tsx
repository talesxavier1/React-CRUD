import "./Grid.css"
import { ptBR, DataGrid, GridColDef, GridLocaleText, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';



interface IGrid {
    linhasGrid: any[]
    propriedadesColunas: GridColDef[]
    setSelectedRows: (gridSelectionModel: GridSelectionModel) => void
    pageChange: (page: number) => void
    loading?: boolean
    gridSizePage?: number
    currentPage?: number
}

const Grid = (props: IGrid) => {
    return (
        <div style={{ height: "100%" }} className={`grid-container_565775cd isLoading_${props.loading ? "true" : "false"}_be860d61`}>
            <DataGrid
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                rows={props.loading ? [] : props.linhasGrid}
                columns={props.propriedadesColunas}
                pageSize={5}
                loading={props.loading}
                rowsPerPageOptions={[5]}
                checkboxSelection
                showCellRightBorder
                showColumnRightBorder
                paginationMode="server"
                getRowId={(row) => row.codigo}
                page={props.currentPage ?? undefined}
                onSelectionModelChange={((gridSelectionModel: GridSelectionModel) => {
                    props.setSelectedRows(gridSelectionModel)
                })}
                onPageChange={(page) => {
                    props.pageChange(page);
                }}
                rowCount={props.gridSizePage ?? props.linhasGrid.length}
            />
        </div>
    );
}

export default Grid;
