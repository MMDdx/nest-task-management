import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => {
  return {
    getTasks: jest.fn(),
  };
};

const mockUser = {
  username: 'mmd',
  id: '1',
  tasks: [],
  password: 'sds'
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initial a nest module with service and Repo
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('calls TasksRepo GetTasks and returns the result', () => {
    it('should return all tasks', async () => {
      // call get Tasks , should call the Repo
      const result = await tasksService.getTasks(
        { status: TaskStatus.OPEN },
        mockUser,
      );
      expect(result).toEqual("something");
    });
  });
});