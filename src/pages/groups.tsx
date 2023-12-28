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
  const {
    group,
    groups,
    createGroup,
    saveGroup,
    criarGroup,
    deleteGroup,
    getGroup,
    listGroups,
    showTable,
    tableVisible
  } = useGroups()

  const {
    connections,
    createConnection,
    saveConnection,
    deleteConnection,
    getConnection,
    listConnections,
  } = useConnections()

  // const [connections, setConnections] = useState([]);


  useEffect(() => {
    listConnections();

  }, []);

  useEffect(() => {
    if (tableVisible) {
      listGroups();
    }
  }, [tableVisible]);

  return (
    <div>
      <Menu />
    <div className={`
      flex justify-center items-center
      h-screen bg
      text-white
    `}>
      <Layout title="Grupos">

        <TableConnections
          connections={connections}
          connectionSelected={getConnection}
          hideCertainColumns={true}
          filterActiveInstances={true}
          showActions={false}
        />
        {tableVisible ? (
          <div>
            <div className="flex justify-end">
              <Button
                className="mb-4"
                onClick={createGroup}
              >
                Nova Grupo
              </Button>
            </div>
            <Table
              groups={groups}
              groupSelected={getGroup}
              groupDeleted={deleteGroup}
            />
          </div>
        ) : (
          <Form
            group={group}
            groupModified={saveGroup}
            canceled={showTable}
          />
        )}
      </Layout>
    </div>
    </div>
  )
}