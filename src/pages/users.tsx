import { useEffect } from "react";
import Botao from "../components/Button";
import Form from "../components/FormUser";
import Layout from "../components/Layout";
import Table from "../components/TableUsers";
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
      // Chame a função listUsers quando tableVisible mudar
      listUsers();
    }
  }, [tableVisible]); // O segundo argumento é um array de dependências

  return (
    <div className={`
      flex justify-center items-center
      h-screen bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Usuários">
        {tableVisible ? (
          <div>
            <div className="flex justify-end">
              <Botao
                color="green"
                className="mb-4"
                onClick={createUser}
              >
                Nova Mensagem
              </Botao>
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
  )
}