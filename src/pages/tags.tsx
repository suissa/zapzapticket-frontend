import { useEffect, useState } from "react";
import Button from "../components/Button";
import Form from "../components/FormTag";
import Layout from "../components/Layout";
import Table from "../components/TableTags";
import Menu from '../components/Menu';
import useTags from "../hooks/useTags";
import useLayout from "../hooks/useLayout";

export default function Home() {
  const {
    tag,
    tags,
    createTag,
    saveTag,
    deleteTag,
    getTag,
    listTags,
    showTable,
    tableVisible
  } = useTags()

  useEffect(() => {
    if (tableVisible) {
      listTags();
    }
  }, [tableVisible]);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Layout title="Tags" width="w3/3">
            {tableVisible ? (
              <div>
                <div className="flex justify-end">
                  <Button
                    className="mb-4"
                    onClick={createTag}
                  >
                    Nova Tag
                  </Button>
                </div>
                <Table
                  tags={tags}
                  tagSelected={getTag}
                  tagDeleted={deleteTag}
                />
              </div>
            ) : (
              <Form
              tag={tag}
              initialColor={tag.color} 
              tagModified={saveTag}
              canceled={showTable}
              />
            )}
          </Layout>
        </div>
      </div>
    </div>


  )
}