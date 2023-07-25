import style from './Nav.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import { Collapse, Toolbar } from '@mui/material';
import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

import StarBorder from '@mui/icons-material/StarBorder';
import Fontawesome from '../../Components/Fontawesome Icon/fontawesome';

const Nav = () => {
    const navigate = useNavigate();
    const [showMenuItens, setshowMenuItens] = useState<string>("");
    const [showSubItens, setShowSubItens] = useState<string>("");

    const itemHandleClick = (value: string) => {
        if (value == showMenuItens) {
            setshowMenuItens("");
            setShowSubItens("");
        } else {
            setshowMenuItens(value);
        }
    };
    const subItemHandleClick = (value: string) => {
        if (value == showSubItens) {
            setShowSubItens("");
        } else {
            setShowSubItens(value);
        }
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 500 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {/* Dashboard */}
            <>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </>

            {/* Cadastros Gerais */}
            <>
                <ListItemButton onClick={() => { itemHandleClick("cadastros_gerais") }}>
                    <ListItemIcon>
                        <FolderCopyRoundedIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Cadastros Gerais" />
                    {showMenuItens == "cadastros_gerais" ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={showMenuItens == "cadastros_gerais"} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* Professor */}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { subItemHandleClick("professor_subItens") }}>
                            <ListItemIcon>
                                <Fontawesome iconClass='fa-solid fa-folder' />
                            </ListItemIcon>
                            <ListItemText primary="Professor" />
                            {showSubItens == "professor_subItens" ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={showSubItens == "professor_subItens"} timeout="auto" unmountOnExit>
                            {/* Formação Acadêmica */}
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} onClick={() => { navigate("/main/formacaoAcademica") }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Formação Acadêmica" />
                                </ListItemButton>
                            </List>
                            {/* Área de atuação */}
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} onClick={() => { navigate("/main/areaAtuacao") }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Área de Atuação" />
                                </ListItemButton>
                            </List>
                            {/* Cargos */}
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} onClick={() => { navigate("/main/cargos") }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Cargos" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>

                    <List component="div" disablePadding>
                        {/* Turma */}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { subItemHandleClick("turma_subItens") }}>
                            <ListItemIcon>
                                <Fontawesome iconClass='fa-solid fa-folder' />
                            </ListItemIcon>
                            <ListItemText primary="Turma" />
                            {showSubItens == "turma_subItens" ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={showSubItens == "turma_subItens"} timeout="auto" unmountOnExit>
                            {/* Áreas de conhecimento */}
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} onClick={() => { navigate("/main/areaDeConhecimento") }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Área de conhecimento" />
                                </ListItemButton>
                            </List>
                            {/* Componentes Curiculares */}
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} onClick={() => { navigate("/main/ComponentesCuriculares") }}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Componentes Curiculares" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>

                </Collapse>
            </>

            {/* Cadastros*/}
            <>
                <ListItemButton onClick={() => { itemHandleClick("cadastros") }}>
                    <ListItemIcon>
                        <Fontawesome iconClass='fa-solid fa-clipboard' />
                    </ListItemIcon>
                    <ListItemText primary="Cadastros" />
                    {showMenuItens == "cadastros" ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={showMenuItens == "cadastros"} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {/* Pessoa*/}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/main/pessoa") }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Pessoa" />
                        </ListItemButton>

                        {/* Aluno*/}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/main/aluno") }}>
                            <ListItemIcon>
                                <Fontawesome iconClass='fa-solid fa-graduation-cap' />
                            </ListItemIcon>
                            <ListItemText primary="Aluno" />
                        </ListItemButton>

                        {/* Professor*/}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/main/professor") }}>
                            <ListItemIcon>
                                <Fontawesome iconClass='fa-solid fa-chalkboard-user' />
                            </ListItemIcon>
                            <ListItemText primary="Professor" />
                        </ListItemButton>

                        {/* Cursos*/}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/main/curso") }}>
                            <ListItemIcon>
                                <Fontawesome iconClass='fa-solid fa-chalkboard' />
                            </ListItemIcon>
                            <ListItemText primary="Cursos" />
                        </ListItemButton>

                        {/* Disciplinas*/}
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("/main/disciplina") }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Disciplinas" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </>

        </List>
    );

}








export default Nav;