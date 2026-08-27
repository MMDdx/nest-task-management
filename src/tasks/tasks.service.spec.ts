import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => {
  return {
    getTasks: jest.fn(),
    findOne: jest.fn(),
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
      const mockTasks = [
        { id: '1', title: 'Test', description: 'test', status: TaskStatus.OPEN },
      ];
      tasksRepository.getTasks.mockResolvedValue(mockTasks);
      // call get Tasks , should call the Repo
      const result = await tasksService.getTasks(
        { status: TaskStatus.OPEN },
        mockUser,
      );
      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTaskById' , () =>{
    it('calls TasksRepository.findOne ans returns the result  ', async () =>{
      const mockTask = {
        title: 'test',
        description: 'test',
        id: 'dsd1',
        status: TaskStatus.OPEN,
      }

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('dsd1', mockUser)
      expect(result).toEqual(mockTask);
    })
    it('calls TasksRepository.findOne and handles an error', async () =>{
        tasksRepository.findOne.mockResolvedValue(null);
        await expect(tasksService.getTaskById('somid', mockUser)).rejects.toThrow(NotFoundException)
    })
  })
});