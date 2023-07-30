import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Aluno from "../Components/Pages/Aluno/Aluno";
import CadastroAluno from "../Components/Pages/Aluno/CadastroAluno/CadastroAluno";
import CadastroTurma from "../Components/Pages/Turma/CadastroTurma/CadastroTurma";
import Turma from "../Components/Pages/Turma/Turma";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import CadastroDisciplina from "../Components/Pages/Disciplina/CadastroDisciplina/CadastroDisciplina";
import Disciplina from "../Components/Pages/Disciplina/Disciplina";
import Login from "../Components/Pages/Login/Login";
import CadastroPessoa from "../Components/Pages/Pessoa/CadastroPessoa/CadastroPessoa";
import Pessoa from "../Components/Pages/Pessoa/Pessoa";
import PessoaContextProvider from "../Components/Pages/Pessoa/PessoaContext";
import CadastroProfessor from "../Components/Pages/Professor/CadastroProfessor/CadastroProfessor";
import Professor from "../Components/Pages/Professor/Professor";
import AuthProvider from "../Contexts/Auth";
import RouterGuard from "./RouterGuard";
import FormacaoAcademica from "../Components/Pages/Cadastros Gerais/Professor/Formação Acadêmica/FormacaoAcademica";
import AreaAtuacao from "../Components/Pages/Cadastros Gerais/Professor/Área de Atuação/AreaAtuacao";
import Cargos from "../Components/Pages/Cadastros Gerais/Professor/Cargos/Cargos";
import ProfessorContextProvider from "../Components/Pages/Professor/ProfessorContext";
import AreaConhecimento from "../Components/Pages/Cadastros Gerais/Turma/Grade Curricular/Área de Conhecimento/AreaConhecimento";
import ComponentesCurriculares from "../Components/Pages/Cadastros Gerais/Turma/Grade Curricular/Componentes Curriculares/ComponentesCurriculares";
import { TurmaContextProvider } from "../Components/Pages/Turma/TurmaContext"

const Rotas = () => {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={
                            <RouterGuard>
                                <App wrapperShow={<Dashboard />} />
                            </RouterGuard>
                        } />

                        <Route path="/login" element={
                            <Login />
                        } />

                        <Route path="/main" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <Dashboard />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/pessoa" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <PessoaContextProvider>
                                        <Pessoa />
                                    </PessoaContextProvider>
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/pessoa/page" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <PessoaContextProvider>
                                        <CadastroPessoa />
                                    </PessoaContextProvider>
                                </RouterGuard>
                            } />
                        } />
                        <Route path="/main/aluno" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <Aluno />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/professor" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <ProfessorContextProvider>
                                        <Professor />
                                    </ProfessorContextProvider>
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/Disciplina" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <Disciplina />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/turma" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <TurmaContextProvider>
                                        <Turma />
                                    </TurmaContextProvider>
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/Dashboard" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <Dashboard />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/aluno/page" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <CadastroAluno />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/turma/page" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <TurmaContextProvider>
                                        <CadastroTurma />
                                    </TurmaContextProvider>
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/disciplina/page" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <CadastroDisciplina />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/professor/page" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <ProfessorContextProvider>
                                        <CadastroProfessor />
                                    </ProfessorContextProvider>
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/formacaoAcademica" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <FormacaoAcademica />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/areaAtuacao" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <AreaAtuacao />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/cargos" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <Cargos />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/areaDeConhecimento" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <AreaConhecimento />
                                </RouterGuard>
                            } />
                        } />

                        <Route path="/main/ComponentesCurriculares" element={
                            <App wrapperShow={
                                <RouterGuard>
                                    <ComponentesCurriculares />
                                </RouterGuard>
                            } />
                        } />

                    </Routes>
                </AuthProvider>
            </Router>
        </>
    )
}

export default Rotas;