const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const KEY = 'todos_v1';
let todos = JSON.parse(localStorage.getItem(KEY) || '[]');

function save(){ localStorage.setItem(KEY, JSON.stringify(todos)); }

function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

function render(){
	list.innerHTML = '';
	todos.forEach((t,i)=>{
		const li = document.createElement('li');
		li.className = 'todo' + (t.done ? ' done' : '');
		li.innerHTML = `<span class="label">${escapeHtml(t.text)}</span>
			<div class="actions">
				<button class="complete-btn" type="button" data-action="toggle" data-i="${i}" aria-label="${t.done ? 'Mark task as incomplete' : 'Mark task as complete'}">
					${t.done ? 'completed' : '✓'}
				</button>
				<button class="delete-btn" type="button" data-action="delete" data-i="${i}" aria-label="Delete task">
					X
				</button>
			</div>`;
		list.appendChild(li);
	});
}

form.addEventListener('submit', e=>{
	e.preventDefault();
	const v = input.value.trim();
	if(!v) return;
	todos.push({text:v,done:false});
	input.value = '';
	save(); render();
});

list.addEventListener('click', e=>{
	const btn = e.target.closest('button');
	if(!btn) return;
	const i = Number(btn.dataset.i);
	const action = btn.dataset.action;
	if(action==='toggle'){ todos[i].done = !todos[i].done; save(); render(); }
	else if(action==='delete'){ todos.splice(i,1); save(); render(); }
});

render();

