import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormGroup";
import Layout from "../components/Layout";
import Table from "../components/TableGroups";
import TableConnections from "../components/TableConnections";
import Menu from '../components/Menu';
import useGroups from "../hooks/useGroups";
import useConnections from "../hooks/useConnections";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleConnectionSelected = (connection) => {
    setSelectedConnection(connection);
    console.log("Groups Page handleConnectionSelected Conexão selecionada:", connection);
    // Outras ações, se necessário
  };
  const {
    group,
    groups,
    createGroup,
    saveGroup,
    deleteGroup,
    getGroup,
    listGroups,
    getProfileImage,
    importContacts,
    showTable,
    tableVisible
  } = useGroups()

  const {
    connections,
    listConnections,
  } = useConnections(setSelectedConnection)


  useEffect(() => {
    listConnections();

  }, []);

  useEffect(() => {
    console.log("Groups Page useEffect selectedConnection:", selectedConnection);
    if (selectedConnection) {
      listGroups(selectedConnection.instanceName);
    }
  }, [selectedConnection]);

  return (
    <div>
      <Menu />
      <div className={`flex justify-center items-center h-screen bg text-white`}>
        <Layout title="Grupos">
          <h1 className="text-white text-xl">
            Conexões
          </h1>
            <p className="text-white text-sm">  *selecione uma conexão para ver seus grupos</p>

          <TableConnections
            connections={connections}
            connectionSelected={handleConnectionSelected}
            hideCertainColumns={true}
            filterActiveInstances={true}
            showActions={false}
            showButton={true}
          />
          {selectedConnection && (
            <div>
              <div className="flex justify-end">
                <Button className="mb-4 mt-4" onClick={createGroup}>
                  Novo Grupo
                </Button>
              </div>
              <Table
                groups={groups}
                groupSelected={getGroup}
                groupDeleted={deleteGroup}
                selectedConnection={selectedConnection}
                getProfileImage={getProfileImage}
                importContacts={importContacts}
              />
            </div>
          )}
          {!tableVisible && !selectedConnection && (
            <Form
              group={group}
              groupModified={saveGroup}
              canceled={showTable}
            />
          )}
        </Layout>
      </div>
    </div>
  );
}