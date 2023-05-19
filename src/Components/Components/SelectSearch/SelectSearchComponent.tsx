import './SelectSearchComponent.css'
import { Theme } from "@emotion/react"
import { Autocomplete, CircularProgress, SxProps, TextField } from "@mui/material"
import { MutableRefObject, useEffect, useState } from "react"
import { useQuery } from "react-query"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export interface IOption {
    desc: any
    id: any
    optionOriginalValue?: any
}

interface ISelectComponent {
    id: string
    sx?: SxProps<Theme>
    inputLabel: string
    inputRefDesc?: MutableRefObject<any>
    inputRefID?: MutableRefObject<any>
    callBackOption?: (value: IOption | null) => void
    defaulOption?: IOption
    getOptions?: (textSearch: string) => Promise<IOption[]>
}

const SelectSearchComponent = (props: ISelectComponent) => {
    const [selectedValue, setSelectedValue] = useState<IOption | null>(null);
    const [inputTextValue, setInputTextValue] = useState<string>("");

    useEffect(() => {
        if (props.defaulOption) {
            setSelectedValue(props.defaulOption);
        }
    }, []);

    const { data, isFetching } = useQuery(
        `getOptions_${props.id}_${inputTextValue}`,
        async () => {
            return props.getOptions ? await props.getOptions(inputTextValue) : [] as IOption[];
        },
        { refetchOnWindowFocus: false, enabled: !!inputTextValue }
    );

    return (
        <div className="select_component_container_a816ecb5" id={props.id}>
            <TextField sx={{ display: "none" }} value={selectedValue?.id ?? ""} inputRef={props.inputRefID} />
            <TextField sx={{ display: "none" }} value={selectedValue?.desc ?? ""} inputRef={props.inputRefDesc} />

            <Autocomplete
                noOptionsText="Sem Opções"
                id={`Autocomplete_id_${props.id}`}
                sx={props.sx}
                forcePopupIcon={true}
                filterOptions={(x) => x}
                onChange={(event, value) => {
                    setSelectedValue(value);
                    if (props.callBackOption) {
                        props.callBackOption(value);
                    }
                }}
                onInputChange={(event, newInputValue) => {
                    setInputTextValue(newInputValue);
                }}
                getOptionLabel={(option) => {
                    return option.desc
                }}
                isOptionEqualToValue={(option, value) => true}
                options={data ?? []}
                value={selectedValue}
                renderOption={(props, option) => {
                    return (
                        <li  {...props} key={option.id}>
                            {option.desc}
                        </li>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.inputLabel}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    <div className='nao_sei_ainda_a816ecb5'>
                                        <button className='button_arrow'>
                                            <KeyboardArrowLeftIcon fontSize='small' sx={{ color: "#736C63" }} />
                                        </button>
                                        <button className='button_arrow'>
                                            <KeyboardArrowRightIcon fontSize='small' color="inherit" sx={{ color: "#736C63" }} />
                                        </button>
                                        {false ? <CircularProgress color="inherit" size={20} sx={{ color: "#736C63" }} /> : null}
                                    </div >
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }}
                    />
                )}
            />
        </div>
    );



}

export default SelectSearchComponent;