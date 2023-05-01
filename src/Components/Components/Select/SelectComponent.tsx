import './SelectComponent.css'
import { Autocomplete, CircularProgress, SxProps, TextField, Theme } from "@mui/material";
import React, { MutableRefObject, useEffect, useState } from "react";
import { useQuery } from "react-query";

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
    asyncOptions: boolean
    options?: IOption[]
    defaulOption?: IOption
    getOptions?: () => Promise<IOption[]>
}

const SelectComponent = (props: ISelectComponent) => {
    const [selectedValue, setSelectedValue] = useState<IOption | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (props.defaulOption) {
            setSelectedValue(props.defaulOption);
        } else {
            setSelectedValue(null);
        }
    }, [props.defaulOption]);

    const { data, isFetching } = useQuery(
        `getOptions_${props.id}`,
        async () => {
            return props.getOptions ? await props.getOptions() : [] as IOption[];
        },
        { refetchOnWindowFocus: false, enabled: (isOpen && props.asyncOptions) }
    );

    return (
        <div className="select_component_container_4e690e86" id={props.id}>
            <TextField sx={{ display: "none" }} value={selectedValue?.id ?? ""} inputRef={props.inputRefID} />
            <TextField sx={{ display: "none" }} value={selectedValue?.desc ?? ""} inputRef={props.inputRefDesc} />

            <Autocomplete
                noOptionsText="Sem Opções"
                id={`Autocomplete_id_${props.id}`}
                sx={props.sx}
                forcePopupIcon={true}
                onOpen={() => {
                    setIsOpen(true);
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                onChange={(event, value) => {
                    setSelectedValue(value);
                    if (props.callBackOption) {
                        props.callBackOption(value);
                    }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => {
                    return option.desc
                }}
                options={(() => {
                    if (!props.asyncOptions) {
                        return (props.options ?? []);
                    }
                    return data && !isFetching ? data : []
                })()}
                value={selectedValue}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.inputLabel}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
            />
        </div>
    );
}

export default SelectComponent;














{/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={"teste22"}
                    
                    aria-checked
                >
                    {props.values.map((VALUE) => {
                        return (<MenuItem value={VALUE.id}>{VALUE.desc}</MenuItem>)
                    })}
                </Select>
            </FormControl> */}
{/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={"sss"}
                aria-label="aaa"
                inputRef={props.inputRef}
                sx={{ width: '120px' }}
            >
                {props.values.map((VALUE) => {
                    return (<MenuItem value={VALUE.id}>{VALUE.desc}</MenuItem>)
                })}
            </Select> */}