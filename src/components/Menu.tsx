import React, { useState, memo } from "react";
import Link from "next/link";
import { debounce } from 'lodash';
import { IconDashboardMenu, IconUsersMenu, IconConnectionsMenu, IconContactsMenu,
IconGroupsMenu, IconKanban, IconSend, IconMessage, IconScheduleMessage, IconTasks, IconTags, IconFastSend, 
IconQueues, IconFastAnswers, IconWhatsapp, IconLogout} from "./Icons";

const Menu = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const handleMouseEnter = debounce(() => {
    setIsExpanded(true);
    if (onToggle) {
      onToggle(true);
    }
  }, 100); // 100ms de delay

  const handleMouseLeave = debounce(() => {
    setIsExpanded(false);
    if (onToggle) {
      onToggle(false);
    }
  }, 100); // 100ms de delay

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  const WhatsappIcon = memo(() => (
    <IconWhatsapp className="text-white" />
  ))

  const LogoutIcon = memo(() => (
    <IconLogout className="text-white" />
  ))

  const DashboardIcon = memo(() => (
    <IconDashboardMenu className="text-white" />
  ));

  const UsersIcon = memo(() => (
    <IconUsersMenu className="text-white" />
  ));

  const ConnectionsIcon = memo(() => (
    <IconConnectionsMenu className="text-white" />
  ));

  const ContactsIcon = memo(() => (
    <IconContactsMenu className="text-white" />
  ));

  const GroupsIcon = memo(() => (
    <IconGroupsMenu className="text-white" />
  ));

  const KanbanIcon = memo(() => (
    <IconKanban className="text-white" />
  ));

  const SendIcon = memo(() => (
    <IconSend className="text-white" />
  ));

  const MessageIcon = memo(() => (
    <IconMessage className="text-white" />
  ));

  const ScheduleMessageIcon = memo(() => (
    <IconScheduleMessage className="text-white" />
  ));

  const TasksIcon = memo(() => (
    <IconTasks className="text-white" />
  ));

  const TagsIcon = memo(() => (
    <IconTags className="text-white" />
  ));

  const FastSendIcon = memo(() => (
    <IconFastSend className="text-white" />
  ));

  const QueuesIcon = memo(() => (
    <IconQueues className="text-white" />
  ));

  const FastAnswersIcon = memo(() => (
    <IconFastAnswers className="text-white" />
  ));

  return (
    <div className={`menu ${isExpanded ? "expanded" : ""}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
      <div className="menu-content">
        <ul className="flex flex-col space-y-4 text-white">
          <li>
          <Link href="/">
            <div className="inline-flex items-center">
              <DashboardIcon className="text-white" />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Dashboard
              </span>
            </div>
          </Link>
          </li>
          <li>
          <Link href="/tickets">
            <div className="inline-flex items-center">
              <WhatsappIcon className="text-white" />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Tickets
              </span>
            </div>
          </Link>
          </li>
          <li>
          <Link href="/fastanswers">
            <div className="inline-flex items-center">
              <FastSendIcon className="text-white" />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Respostas Rápidas
              </span>
            </div>
          </Link>
          </li>
          <li>
            <Link href="/kanban">
              <div className="inline-flex items-center">
                <KanbanIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Funil
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/schedulemessages">
              <div className="inline-flex items-center">
                <ScheduleMessageIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Campanhas
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/groups">
              <div className="inline-flex items-center">
                <GroupsIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Grupos
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/queues">
              <div className="inline-flex items-center">
                <QueuesIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Filas
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <div className="inline-flex items-center">
                <TagsIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Tags
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tasks">
              <div className="inline-flex items-center">
                <TasksIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Tarefas
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/connections">
              <div className="inline-flex items-center">
                <ConnectionsIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Conexões
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/contacts">
              <div className="inline-flex items-center">
                <ContactsIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Contatos
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <div className="inline-flex items-center">
                <MessageIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Mensagens
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/send">
              <div className="inline-flex items-center">
                <SendIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Enviar Mensagem
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <div className="inline-flex items-center">
                <UsersIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Usuários
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <div className="inline-flex items-center">
                <LogoutIcon className="text-white" />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Sair
                </span>
              </div>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Menu;