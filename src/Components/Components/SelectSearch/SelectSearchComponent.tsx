import './SelectSearchComponent.css'
import { Theme } from "@emotion/react"
import { Autocomplete, Button, CircularProgress, SxProps, TextField } from "@mui/material"
import React, { MutableRefObject, useEffect, useState } from "react"
import { useQuery } from "react-query"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useDebounce from '../../../utils/useDebounce'
import { GUID } from '../../../utils/GUID'

export interface IOption {
    desc: any
    id: any
    optionOriginalValue?: any
}

interface ISelectComponent {
    id: string
    sx?: SxProps<Theme>
    inputLabel: string
    multiple?: boolean
    inputRefDesc?: MutableRefObject<any>
    inputRefID?: MutableRefObject<any>
    callBackOption?: (value: IOption[] | null) => void
    defaulOption?: IOption[]
    getOptions?: (textSearch: string, skip: number, take: number) => Promise<IOption[]>
    countOptions?: (textSearch: string) => Promise<number>
}

const SelectSearchComponent = (props: ISelectComponent) => {
    const [selectedValue, setSelectedValue] = useState<IOption[] | null>(null);
    const [inputTextValue, setInputTextValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(inputTextValue, 1000);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState(0);


    let depString = props.defaulOption ? JSON.stringify(props.defaulOption) : undefined;
    useEffect(() => {
        setSelectedValue(props.defaulOption ?? null);
    }, [depString]);

    const { data: options, isFetching: optionsIsFetching } = useQuery(
        `getOptions_${props.id}_${debouncedValue}_${page}`,
        async () => {
            let result: IOption[] = [];
            if (props.getOptions) {
                result = await props.getOptions(debouncedValue, page * 5, 5) as IOption[];
            }
            return result
        },
        { refetchOnWindowFocus: false, enabled: (!!debouncedValue || isOpen), cacheTime: 2000 }
    );

    const { data: count } = useQuery(
        `countOptions_${props.id}_${debouncedValue}`,
        async () => {
            return props.countOptions ? await props.countOptions(debouncedValue) : 0;
        },
        { refetchOnWindowFocus: false, enabled: (!!debouncedValue || isOpen), cacheTime: 2000 }
    );

    function addToEndAdornment(endAdornment: any) {
        const children = React.Children.toArray(endAdornment.props.children);
        children.unshift(
            <div key={GUID.getGUID()}>
                <div className='circular_progress_a816ecb5'>
                    {optionsIsFetching ? <CircularProgress color="inherit" size={20} sx={{ color: "#736C63" }} /> : null}
                </div>
                {(count && count > 5 && isOpen) ?
                    <div className='arrow_buttons_a816ecb5' >
                        <button className='button_arrow'
                            onClick={() => {
                                setPage(page - 1);
                            }}
                            disabled={page == 0}
                        >
                            <KeyboardArrowLeftIcon fontSize='small' sx={{ color: "#736C63" }} />
                        </button>
                        <button
                            className='button_arrow'
                            onClick={() => {
                                setPage(page + 1);
                            }}
                            disabled={((count ?? 0) / 5) < page + 1}
                        >
                            <KeyboardArrowRightIcon fontSize='small' color="inherit" sx={{ color: "#736C63" }} />
                        </button>
                    </div>
                    :
                    null
                }
            </div>
        );
        return React.cloneElement(endAdornment, {}, children);
    }

    return (
        <div className="select_component_container_a816ecb5" id={props.id}>
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
                inputRef={props.inputRefID} />
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
            <Autocomplete
                noOptionsText="Sem Opções"
                id={`Autocomplete_id_${props.id}`}
                size='small'
                freeSolo
                onBlur={() => {
                    if (props.multiple) {
                        setInputTextValue("");
                    }
                    setPage(0);
                }}
                clearOnBlur={!props.multiple}
                inputValue={inputTextValue}
                multiple={props.multiple}
                forcePopupIcon={true}
                sx={props.sx}
                filterOptions={(x) => x}
                onOpen={() => { setIsOpen(true) }}
                onClose={() => { setIsOpen(false); setPage(0); }}
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
                    setPage(0);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputTextValue(newInputValue);
                }}
                inputMode='search'
                getOptionLabel={(option) => {
                    if (typeof option == "string") {
                        return option;
                    }

                    if (Array.isArray(option)) {
                        return option.map(VALUE => VALUE.desc).join(",");
                    }
                    return option.desc
                }}
                isOptionEqualToValue={(option, value) => {
                    return JSON.stringify(option) === JSON.stringify(value);
                }}
                options={options ?? []}
                value={(() => {
                    if (!selectedValue) {
                        if (props.multiple) { return [] }
                        return null;
                    }
                    return selectedValue;
                })()}
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
                        sx={{ width: "100%" }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <div className='endAdornment_a816ecb5'>
                                    {addToEndAdornment(params.InputProps.endAdornment)}
                                </div>
                            )
                        }}
                    />
                )}
            />
        </div>
    );



}



export default SelectSearchComponent;


