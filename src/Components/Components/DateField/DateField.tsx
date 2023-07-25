import { Theme } from '@mui/material/styles/';
import { SxProps } from '@mui/system/styleFunctionSx';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MutableRefObject, useEffect, useState } from 'react';
import ptBRDayjs from 'dayjs/locale/pt-br';
import { ptBR } from '@mui/x-date-pickers/locales';

import './DateField.css'

interface props {
    label: string
    sx?: SxProps<Theme>
    id?: string,
    value?: string
    required?: boolean
    inputRef?: MutableRefObject<any>
}

const DateField = (props: props) => {
    const [value, setValue] = useState<string | null>(null);
    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        } else {
            setValue(null);
        }
    }, [props.value])

    return (
        <div id={props.id} className="fea82eaf" >
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={ptBRDayjs}
                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <DatePicker

                    inputFormat='DD/MM/YYYY'
                    inputRef={props.inputRef}
                    label={props.label}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField required={props.required} sx={props.sx}{...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}

export default DateField;