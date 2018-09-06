import Fs from 'fs';
import Path from 'path';
import { BaseService, RequestHelper } from '../infrastructure';
import { validateEventOptions } from './Events';

class Projects extends BaseService {
  all(options) {
    return RequestHelper.get(this, 'projects', options);
  }

  archive(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/archive`);
  }

  create(options) {
    const url = options.userId ? `projects/user/${encodeURIComponent(options.userId)}` : 'projects';

    return RequestHelper.post(this, url, options);
  }

  edit(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}`, options);
  }

  events(projectId: ProjectId, options) {
    validateEventOptions(options.action, options.targetType);

    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/events`, options);
  }

  fork(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/fork`, options);
  }

  forks(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/forks`, options);
  }

  languages(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}/languages`);
  }

  mirrorPull(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/mirror/pull`);
  }

  remove(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.delete(this, `projects/${pId}`);
  }

  search(projectName: string) {
    return RequestHelper.get(this, 'projects', { search: projectName });
  }

  share(projectId: ProjectId, groupId, groupAccess, options) {
    const pId = encodeURIComponent(projectId);

    if (!groupId || !groupAccess) throw new Error('Missing required arguments');

    return RequestHelper.post(this, `projects/${pId}/share`, { groupId, groupAccess, ...options });
  }

  show(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.get(this, `projects/${pId}`, options);
  }

  star(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/star`);
  }

  statuses(projectId: ProjectId, sha, state, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/statuses/${sha}`, { state, ...options });
  }

  transfer(projectId: ProjectId, namespace) {
    const pId = encodeURIComponent(projectId);
    return RequestHelper.put(this, `projects/${pId}/transfer`, namespace);
  }

  unarchive(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unarchive`);
  }

  unshare(projectId: ProjectId, groupId) {
    const [pId, gId] = [projectId, groupId].map(encodeURIComponent);

    return RequestHelper.delete(this, `projects/${pId}/share${gId}`);
  }

  unstar(projectId: ProjectId) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.post(this, `projects/${pId}/unstar`);
  }

  updatePushRule(projectId: ProjectId, options) {
    const pId = encodeURIComponent(projectId);

    return RequestHelper.put(this, `projects/${pId}/push_rule`, options);
  }

  upload(projectId: ProjectId, filePath, { fileName = Path.basename(filePath) } = {}) {
    const pId = encodeURIComponent(projectId);
    const file = Fs.readFileSync(filePath);

    return RequestHelper.post(
      this,
      `projects/${pId}/uploads`,
      {
        file: {
          value: file,
          options: {
            filename: fileName,
            contentType: 'application/octet-stream',
          },
        },
      },
      true,
    );
  }
}

export default Projects;
