import { useEffect } from "react";
import Button from "../components/Button";
import Form from "../components/FormUser";
import Layout from "../components/Layout";
import Table from "../components/TableUsers";
import Menu from '../components/Menu';
import useUsers from "../hooks/useUsers";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    user,
    users,
    createUser,
    saveUser,
    criarUser,
    deleteUser,
    getUser,
    listUsers,
    showTable,
    tableVisible
  } = useUsers()

  useEffect(() => {
    if (tableVisible) {
      listUsers();
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
      <Layout title="Usuários">
        {tableVisible ? (
          <div>
            <div className="flex justify-end">
              <Button
                className="mb-4"
                onClick={createUser}
              >
                Novo Usuário
              </Button>
            </div>
            <Table
              users={users}
              userSelected={getUser}
              userDeleted={deleteUser}
            />
          </div>
        ) : (
          <Form
            user={user}
            userModified={saveUser}
            canceled={showTable}
          />
        )}
      </Layout>
    </div>
    </div>
  )
}