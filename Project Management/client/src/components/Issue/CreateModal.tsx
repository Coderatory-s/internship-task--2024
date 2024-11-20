import React, { useState, useEffect } from "react";
import { Modal, Icon } from "semantic-ui-react";
import { getProjects } from "../../utils/API/project_API";
import { User, getUsers } from "../../utils/API/user_API";
import { Issue, createIssue } from "../../utils/API/issue_API";
import { getIssueTypes } from "../../utils/API/issuetype_API";
import { getPriorities } from "../../utils/API/priority_API";
import { KanbanType, getKanbanTypes } from "../../utils/API/kanbantype_API";

export interface ReactSelectProps {
  value: string;
  label: string | React.ReactNode;
}
export interface CreateModalProps {
  currentUser: User;
  isOpen: boolean;
  handleClose: () => void;
}
const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { isOpen, handleClose, currentUser } = props;
  const [projects, setProjects] = useState<any[]>([]);
  const [projectLabel, setProjectLabel] = useState<ReactSelectProps>();
  const [issueTypeLabel, setIssueTypeLabel] = useState<ReactSelectProps>();
  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeLabel, setAssigneeLabel] = useState<ReactSelectProps>();
  const [assignees, setAssignees] = useState<any[]>([]);
  const [priorityLabel, setPriorityLabel] = useState<ReactSelectProps>();
  const [priorities, setPriorites] = useState<any[]>([]);
  const [epicId, setEpicId] = useState("");
  const [kanbanTypes, setKanbanTypes] = useState<KanbanType[]>([]);
  const [projectsAreLoading, setProjectsLoading] = useState(true);
  const [issueTypesAreLoading, setIssueTypesLoading] = useState(true);
  const [assigneesAreLoading, setAssigneesLoading] = useState(true);
  const [prioritiesAreLoading, setPrioritiesLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issue: Partial<Issue> = {
      projectId: projectLabel?.value || "",
      creatorId: currentUser._id,
      issueTypeId: issueTypeLabel?.value || "",
      assigneeId: assigneeLabel?.value || "",
      priorityId: priorityLabel?.value || "",
      statusId: kanbanTypes[0]._id,
      epicId,
      summary,
      description,
    };
    const { success } = await createIssue(issue);
    if (success) {
      handleClose();
    } else {
      setError(true);
    }
  };

  const assignMeHandler = () => {
    const me = assignees.find((assignee) => assignee.value === currentUser._id);
    setAssigneeLabel({
      value: me.value,
      label: `${currentUser.firstname} ${currentUser.lastname}`,
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, success } = await getProjects();
      setProjectsLoading(false);
      if (success && data.length) {
        setProjectLabel({
          value: data[0]._id,
          label: `${data[0].name} (${data[0].key})`,
        });
        const prepareData = data.map((project) => {
          return {
            value: project._id,
            label: `${project.name} (${project.key})`,
          };
        });
        setProjects(prepareData);
      }
    };
    fetchProjects();

    const fetchIssueTypes = async () => {
      const { data, success } = await getIssueTypes();
      setIssueTypesLoading(false);
      if (success) {
        const issueType = data.find((type) => type.id === "story");
        if (issueType) {
          setIssueTypeLabel({
            value: issueType._id,
            label: (
              <>
                <Icon
                  name={issueType.icon as any}
                  color={issueType.color as any}
                />
                {issueType.label}
              </>
            ),
          });
        }
        const prepareData = data.map((issueType) => {
          return {
            value: issueType._id,
            label: (
              <>
                <Icon
                  name={issueType.icon as any}
                  color={issueType.color as any}
                />
                {issueType.label}
              </>
            ),
          };
        });
        setIssueTypes(prepareData);
      }
    };
    fetchIssueTypes();

    const fetchAssignees = async () => {
      const { data, success } = await getUsers();
      setAssigneesLoading(false);
      if (success) {
        const prepareData = data.map((user) => {
          return {
            value: user._id,
            label: (
              <>
                {user.firstname} {user.lastname || ""}
              </>
            ),
          };
        });
        setAssignees(prepareData);
      }
    };
    fetchAssignees();

    const fetchPriorities = async () => {
      const { data, success } = await getPriorities();
      setPrioritiesLoading(false);
      if (success) {
        const priority = data.find((prio) => prio.id === "medium");
        if (priority) {
          setPriorityLabel({
            value: priority._id,
            label: (
              <>
                <Icon
                  name={priority.icon as any}
                  color={priority.color as any}
                />
                {priority.label}
              </>
            ),
          });
        }
        const prepareData = data.map((priority) => {
          return {
            value: priority._id,
            label: (
              <>
                <Icon
                  name={priority.icon as any}
                  color={priority.color as any}
                />
                {priority.label}
              </>
            ),
          };
        });
        setPriorites(prepareData);
      }
    };
    fetchPriorities();

    const fetchKanbanTypes = async () => {
      const { data, success } = await getKanbanTypes();
      if (success) {
        setKanbanTypes(data);
      }
    };
    fetchKanbanTypes();
  }, [isOpen]);

  // Component logic remains unchanged

  return (
    <Modal open={isOpen} size="large" centered>
      {/* Component structure */}
    </Modal>
  );
};

export default CreateModal;
