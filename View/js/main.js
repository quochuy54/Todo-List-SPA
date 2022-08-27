const stt = $('.email');
const row = $('#area-task-list');
const param = [];
param.orderField = 'name';
param.orderType = 'asc';

const statusArray = [
	{name: 'High', status: 'high', color: 'active'},
	{name: 'Medium', status: 'medium', color: 'waiting'},
	{name: 'Low', status: 'low', color: 'low'},
];

$(document).ready(() => {
	showItem(param);
});


// add form
$('#add-btn').click(function(e) {
	if($('#form-add').hasClass('d-flex'))
	{
		$('#form-add').removeClass('d-flex');
		$('#form-add').addClass('d-none');
		$('#add-btn').html("Add Task");
		$('#add-btn').removeClass('btn-secondary');
		$('#add-btn').addClass('btn-primary');
	}
	else{
		$('#form-add').removeClass('d-none');
		$('#form-add').addClass('d-flex');
		$('#add-btn').removeClass('btn-primary');
		$('#add-btn').addClass('btn-secondary');
		$('#add-btn').html("Close");
		console.log($('.check-input111'))
	}
});

$('#form-add').submit(async function(e) {
	e.preventDefault();
	if($('#id-update').val() !== ''){
		let id = $('#id-update').val();
		let name = $('#name-input').val();
		let status = $('.form-select').val();
		const response = await fetch('http://localhost:3000/api/v1/' + id, {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(
				{
					name,
					status
				}
			)
		})
		$('#id-update').val('');
		$('#name-input').val('');
		$('.form-select').val('low');
	}
	else{
		let name = $('#name-input').val();
		let status = $('.form-select').val();
		const response = await fetch('http://localhost:3000/api/v1/', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(
			{
				name,
				status
			}
			)
		})
		$('#id-update').val('');
		$('#name-input').val('');
		$('.form-select').val('low');
	}
	showItem(param);
});

//update task
getInfoUpdateItem = function(id) {
	$.getJSON( "http://localhost:3000/api/v1/" + id, (data) => {
		if($('#form-add').hasClass('d-none'))
		{
		$('#form-add').removeClass('d-none')
		$('#form-add').addClass('d-flex');
		$('#add-btn').html('Close');
		$('#add-btn').removeClass('primary-secondary');
		$('#add-btn').addClass('btn-secondary');
		}
		$('#id-update').val(data._id);
		$('#name-input').val(data.name);
		$('.form-select').val(data.status);		
	})
};


// delete task
deleteItem = async (id) => {
	const result = confirm("Deleted?")
	if(result){
		const response = await fetch('http://localhost:3000/api/v1/' + id, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		showItem(param);
	}
};

// sort event
$('.dropdownItem').click((e) => {
	param.orderType = $(e.target).data('ordertype');
	param.orderField = $(e.target).data('orderfield');
	content =`<span id="labelSort" class="ml-2">${param.orderField} - ${param.orderType}</span>`;
	$('#labelSortWrap').html(content);
	showItem(param);
});

// search event
$('#form-search').submit((e) => {
	e.preventDefault();
	param.keyword = $('#inputSearch').val();
	showItem(param)
});

showColorStatus = (status) => {
	const item = statusArray.find((item) => item.status == status)
	return item}


showItem = (param) => {

	let url = '';

	if(param && param.orderField) {
		url += `orderField=${param.orderField}&orderType=${param.orderType}&`;
	};

	if(param && param.keyword) {
		url += `keyword=${param.keyword}`;
	};
	
	$.getJSON( "http://localhost:3000/api/v1/?" + url, function( data ) {
	let html = '';
	if(data){
		$.map(data, (item, i) => {
			let stt = i+1;
			let name = item.name;
			let status = showColorStatus(item.status);
			html += `
				<tr class="alert" role="alert">
						<td>
						<input class="form-check-input check-input111" type="checkbox" value="">
					</td>
					<td class="">
						<div class="pl-3 email">
							<span>${stt}</span>
						</div>
					</td>
					<td>
						<div id="name-content">
							${name}
						</div>
					</td>
					<td class="status"><span class="${status.color}">${status.name}</span></td>
					<td>
					 	<div>
						 <button type="button" class="btn btn-warning mr-2" onclick="getInfoUpdateItem('${item._id}')">Update</button>
						 <button type="button" class="btn btn-danger detele-btn" onclick="deleteItem('${item._id}')">Delete</button>
						 </div>
					</td>
				</tr>`
		})
		row.html(html);
	}
});}

// checked
$('.check-input111').change(function(e) {
	// if($(this).checked){
	console.log($('.check-input111'))
		// $('#name-content').css('text-decoration', 'underline')
	// }
})

