const request = require("supertest");
const app = require("../index.js");
describe("testing/tasks", () => {
    const task = {
      title: "testTitle",
      completed: false,
    };
    test("Create a task", async () => {
      const res = await request(app)
        .post("/tasks")
        .send(task)
        .expect(201)
           const sendTask = {
            ...task,
            _id: res.body.task._id,
            createdAt: res.body.task.createdAt,
            updatedAt: res.body.task.updatedAt,
            __v: res.body.task.__v,
          };
          const newTask = res.body.task;
          expect(newTask).toEqual(sendTask);
    });
  });