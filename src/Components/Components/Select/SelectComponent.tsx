import './SelectComponent.css'
import { Autocomplete, CircularProgress, SxProps, TextField, Theme } from "@mui/material";
import React, { MutableRefObject, memo, useEffect, useState } from "react";
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
    callBackOption?: (value: IOption[] | null) => void
    asyncOptions: boolean
    options?: IOption[]
    defaulOption?: IOption[]
    getOptions?: () => Promise<IOption[]>
    multiple?: boolean
    required?: boolean
}

const SelectComponent = (props: ISelectComponent) => {
    const [selectedValue, setSelectedValue] = useState<IOption[] | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    let depString = props.defaulOption ? JSON.stringify(props.defaulOption) : undefined;
    useEffect(() => {
        setSelectedValue(props.defaulOption ?? null);
    }, [depString]);

    const { data, isFetching } = useQuery(
        `getOptions_${props.id}`,
        async () => {
            return props.getOptions ? await props.getOptions() : [] as IOption[];
        },
        { refetchOnWindowFocus: false, enabled: (isOpen && props.asyncOptions) }
    );

    return (
        <div className="select_component_container_4e690e86" id={props.id}>
            <><TextField
                sx={{ display: "none" }}
                value={(() => {
                    if (!selectedValue) {
                        if (props.multiple) { return "[]" }
                        return "";
                    }

                    if (props.multiple) {
                        return JSON.stringify(selectedValue.map(VALUE => VALUE.id));
                    }
                    return selectedValue[0].id;

                })()}
                inputRef={props.inputRefID}
            />
            </>
            <><TextField
                sx={{ display: "none" }}
                value={(() => {

                    if (!selectedValue) {
                        if (props.multiple) { return "[]" }
                        return "";
                    }

                    if (props.multiple) {
                        return JSON.stringify(selectedValue.map(VALUE => VALUE.desc));
                    }
                    return selectedValue[0].desc;
                })()}
                inputRef={props.inputRefDesc}
            />
            </>
            <><Autocomplete
                size='small'
                noOptionsText="Sem Opções"
                id={`Autocomplete_id_${props.id}`}
                sx={props.sx}
                freeSolo
                clearOnBlur
                forcePopupIcon={true}
                multiple={props.multiple}
                onOpen={() => {
                    setIsOpen(true);
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                onChange={(event, valueParam) => {
                    let value = (() => {
                        if (Array.isArray(valueParam)) {
                            return valueParam as IOption[];
                        } else if (!valueParam) {
                            return null;
                        } else {
                            return [valueParam] as IOption[];
                        }
                    })();

                    setSelectedValue(value);
                    if (props.callBackOption) {
                        props.callBackOption(value);
                    }
                }}
                isOptionEqualToValue={(option, value) => {
                    return JSON.stringify(option) === JSON.stringify(value);
                }}
                getOptionLabel={(option) => {
                    if (typeof option == "string") {
                        return option;
                    }

                    if (Array.isArray(option)) {
                        return option.map(VALUE => VALUE.desc).join(",");
                    }
                    return option.desc
                }}
                options={(() => {
                    if (!props.asyncOptions) {
                        return (props.options ?? []);
                    }
                    return data && !isFetching ? data : []
                })()}
                value={(() => {
                    if (!selectedValue) {
                        if (props.multiple) { return [] }
                        return null;
                    }
                    return selectedValue;
                })()}
                getOptionDisabled={(option) => {
                    let isSelectedValue = (() => {
                        if (selectedValue && selectedValue.find(VALUE => VALUE.desc == option.desc && VALUE.id == option.id)) {
                            return true;
                        }
                        return false;
                    })();
                    return isSelectedValue
                }}
                renderInput={(params) => (
                    <TextField
                        required={props.required}
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
            </>
        </div>
    );
}

export default SelectComponent;