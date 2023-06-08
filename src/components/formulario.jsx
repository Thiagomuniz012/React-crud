import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [periodo, setperiodo] = useState({
    periodo: "",
    codigo: "",
    disciplina: "",
    cargaHoraria: "",
    credito: "",
  });

  const [periodos, setperiodos] = useState([]);
  const [editingperiodoIndex, setEditingperiodoIndex] = useState(-1);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    const savedperiodos = localStorage.getItem("periodos");
    if (savedperiodos) {
      setperiodos(JSON.parse(savedperiodos));
    }
  }, []);

  const handleInputChange = (event) => {
    setperiodo({
      ...periodo,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddperiodo = () => {
    if (periodo.periodo.trim() !== "") {
      let updatedperiodos;
      if (editingperiodoIndex === -1) {
        updatedperiodos = [...periodos, periodo];
      } else {
        updatedperiodos = [...periodos];
        updatedperiodos[editingperiodoIndex] = periodo;
      }
      setperiodos(updatedperiodos);
      setEditingperiodoIndex(-1);
      setperiodo({
        periodo: "",
        codigo: "",
        disciplina: "",
        cargaHoraria: "",
        credito: "",
      });
      setModalVisivel(false);
  
      localStorage.setItem("periodos", JSON.stringify(updatedperiodos));
    }
  };

  const handleEditperiodo = (index) => {
    const selectedperiodo = periodos[index];
    setperiodo({
      periodo: selectedperiodo.periodo,
      codigo: selectedperiodo.codigo,
      disciplina: selectedperiodo.disciplina,
      cargaHoraria: selectedperiodo.cargaHoraria,
      credito: selectedperiodo.credito,
    });
    setEditingperiodoIndex(index);
    setModalVisivel(true);
  };
  

  const handleDeleteperiodo = (index) => {
    const updatedperiodos = [...periodos];
    updatedperiodos.splice(index, 1);
    setperiodos(updatedperiodos);
    setEditingperiodoIndex(-1);

    localStorage.setItem("periodos", JSON.stringify(updatedperiodos));
  };

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  return (
    <div>
      <div>
        <button onClick={abrirModal} id="abrir-modal">
          Adicionar Período
        </button>

        {modalVisivel ? (
          <div className="modal">
            <div className="modal-conteudo">
              <h1>
                {editingperiodoIndex === -1
                  ? "Adicionar Período"
                  : "Atualizar Período"}
              </h1>
              <br />
              <input
                type="text"
                name="periodo"
                value={periodo.periodo}
                onChange={handleInputChange}
                placeholder="Período"
              />
              <input
                type="text"
                name="codigo"
                value={periodo.codigo}
                onChange={handleInputChange}
                placeholder="Código"
              />
              <input
                type="text"
                name="disciplina"
                value={periodo.disciplina}
                onChange={handleInputChange}
                placeholder="Disciplina"
              />
              <input
                type="number"
                name="cargaHoraria"
                value={periodo.cargaHoraria}
                onChange={handleInputChange}
                placeholder="Carga Horária"
              />
                            <input
                type="number"
                name="credito"
                value={periodo.credito}
                onChange={handleInputChange}
                placeholder="Crédito"
              />{" "}
              <br />
              <br />
              <button onClick={handleAddperiodo} id="salvar-modal">
                {editingperiodoIndex === -1
                  ? "Adicionar Período"
                  : "Atualizar Período"}
              </button>
              <button onClick={fecharModal} id="fechar-modal">
                Fechar
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div id="tabela-container">
        <div id="shadow">
          <table>
            <thead>
              <tr>
                <th>Período</th>
                <th>Código</th>
                <th>Disciplina</th>
                <th>Carga Horária</th>
                <th>Crédito</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {periodos.map((periodo, index) => (
                <tr key={index}>
                  <td>{periodo.periodo}</td>
                  <td>{periodo.codigo}</td>
                  <td>{periodo.disciplina}</td>
                  <td>{periodo.cargaHoraria}</td>
                  <td>{periodo.credito}</td>
                  <td>
                    <div id="btn-cont">
                      <button
                        onClick={() => handleEditperiodo(index)}
                        className="btn-acoes"
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#4caf50" }}
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteperiodo(index)}
                        className="btn-acoes"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#f44336" }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
