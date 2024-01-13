import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { debounce } from 'lodash';
import { IconDashboardMenu, IconUsersMenu, IconConnectionsMenu, IconContactsMenu,
IconGroupsMenu, IconKanban, IconSend, IconMessage, IconScheduleMessage, IconTasks, IconTags, IconFastSend, 
IconQueues, IconFastAnswers, IconWhatsapp, IconLogout} from "./Icons";

interface MenuProps {
  onToggle: (isExpanded: boolean) => void;
}
const Menu = memo(({ onToggle }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [className, setClassName] = useState("text-white");

  const handleMouseEnter = useCallback(debounce(() => {
    setIsExpanded(true);
    if (onToggle) {
      onToggle(true);
    }
  }, 100), []); // dependências vazias significam que isso só é criado uma vez

  const handleMouseLeave = useCallback(debounce(() => {
    setIsExpanded(false);
    if (onToggle) {
      onToggle(false);
    }
  }, 100), []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  const WhatsappIcon = memo(() => (
    <IconWhatsapp className="text-white icon-white" />
  ))
  WhatsappIcon.displayName = "WhatsappIcon";

  const LogoutIcon = memo(() => (
    <IconLogout className="text-white" />
  ))
  LogoutIcon.displayName = "LogoutIcon";

  const DashboardIcon = memo(() => (
    <IconDashboardMenu className="text-white" />
  ));
  DashboardIcon.displayName = "DashboardIcon";

  const UsersIcon = memo(() => (
    <IconUsersMenu className="text-white" />
  ));
  UsersIcon.displayName = "UsersIcon";

  const ConnectionsIcon = memo(() => (
    <IconConnectionsMenu className="text-white" />
  ));
  ConnectionsIcon.displayName = "ConnectionsIcon";

  const ContactsIcon = memo(() => (
    <IconContactsMenu className="text-white" />
  ));
  ContactsIcon.displayName = "ContactsIcon";

  const GroupsIcon = memo(() => (
    <IconGroupsMenu className="text-white" />
  ));
  GroupsIcon.displayName = "GroupsIcon";

  const KanbanIcon = memo(() => (
    <IconKanban className="text-white" />
  ));
  KanbanIcon.displayName = "KanbanIcon";

  const SendIcon = memo(() => (
    <IconSend className="text-white" />
  ));
  SendIcon.displayName = "SendIcon";

  const MessageIcon = memo(() => (
    <IconMessage className="text-white" />
  ));
  MessageIcon.displayName = "MessageIcon";

  const ScheduleMessageIcon = memo(() => (
    <IconScheduleMessage className="text-white" />
  ));
  ScheduleMessageIcon.displayName = "ScheduleMessageIcon";

  const TasksIcon = memo(() => (
    <IconTasks className="text-white" />
  ));
  TasksIcon.displayName = "TasksIcon";

  const TagsIcon = memo(() => (
    <IconTags className="text-white" />
  ));
  TagsIcon.displayName = "TagsIcon";

  const FastSendIcon = memo(() => (
    <IconFastSend className="text-white" />
  ));
  FastSendIcon.displayName = "FastSendIcon";

  const QueuesIcon = memo(() => (
    <IconQueues className="text-white" />
  ));
  QueuesIcon.displayName = "QueuesIcon";

  const FastAnswersIcon = memo(() => (
    <IconFastAnswers className="text-white" />
  ));
  FastAnswersIcon.displayName = "FastAnswersIcon";

  return (
    <div className={`menu ${isExpanded ? "expanded" : ""}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
      <div className="menu-content">
        <ul className="flex flex-col space-y-4 text-white">
          <li>
          <Link href="/connections">
            <div className="inline-flex items-center">
              <DashboardIcon />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Dashboard
              </span>
            </div>
          </Link>
          </li>
          <li>
          <Link href="/tickets">
            <div className="inline-flex items-center">
              <WhatsappIcon />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Tickets
              </span>
            </div>
          </Link>
          </li>
          {/* <li>
          <Link href="/fastanswers">
            <div className="inline-flex items-center">
              <FastSendIcon />
              <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                Respostas Rápidas
              </span>
            </div>
          </Link>
          </li> */}
          <li>
            <Link href="/kanban">
              <div className="inline-flex items-center">
                <KanbanIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Funil
                </span>
              </div>
            </Link>
          </li>
          {/* <li>
            <Link href="/schedulemessages">
              <div className="inline-flex items-center">
                <ScheduleMessageIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Campanhas
                </span>
              </div>
            </Link>
          </li> */}
          <li>
            <Link href="/groups">
              <div className="inline-flex items-center">
                <GroupsIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Grupos
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/queues">
              <div className="inline-flex items-center">
                <QueuesIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Filas
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <div className="inline-flex items-center">
                <TagsIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Tags
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/tasks">
              <div className="inline-flex items-center">
                <TasksIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Tarefas
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/connections">
              <div className="inline-flex items-center">
                <ConnectionsIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Conexões
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/contacts">
              <UsersIcon />
              <div className="inline-flex items-center">
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Contatos
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <div className="inline-flex items-center">
                <MessageIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Mensagens
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/send">
              <div className="inline-flex items-center">
                <SendIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Enviar Mensagem
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <div className="inline-flex items-center">
                <ContactsIcon />
                <span className={`menu-text transition-all duration-300 ${isExpanded ? 'w-auto visible' : 'w-0 invisible'}`}>
                  Usuários
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <div className="inline-flex items-center">
                <LogoutIcon />
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
});

Menu.displayName = "Menu";

export default Menu;