import TodoFilter from "@/components/todos/TodoFilter";
import TodoList from "@/components/todos/TodoList";
import TodoModal from "@/components/todos/TodoModal";
import TodoTitle from "@/components/todos/TodoTitle";

function Todos() {
  return (
    <>
      <div className="p-6">
        <TodoTitle />
        <TodoFilter />
        <TodoList />
        {/* <Empty /> */}
      </div>
      <TodoModal />
    </>
  );
}

export default Todos;
