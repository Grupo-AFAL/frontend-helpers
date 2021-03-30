---
title: Dynamic Fields
description: Dynamic Fields component
---

<div data-controller="dynamic-fields" 
			data-dynamic-fields-size="1" 
			data-dynamic-fields-selector=".lunch-fields" 
			data-dynamic-fields-remove-duplicates="true">
	<div class="btn-wrapper">
		<div class="label is-pulled-left">Colaciones</div>
		<div class="buttons has-addons is-pulled-right">
			<a class="button is-primary" data-dynamic-fields-target="button" href=# data-action="dynamic-fields#addFields">Agregar Colación</a>
		</div>
	</div>
                         
<div class="columns is-vcentered is-fullwidth mb-1">
	<div class="column is-11">
		<div class="control ">
			<div id="cafeteria_product_id_select_div" class="select is-fullwidth">
				<select name="cafeteria_daily_plan[lunches_attributes][new_record][cafeteria_product_id]" 
					id="cafeteria_daily_plan_lunches_attributes_new_record_cafeteria_product_id">
						<option value="1">Opcion 1</option>
						<option value="2">Opcion 2</option>
						<option value="3">Opcion 3</option>
						<option value="4">Opcion 4</option>
				</select>
			</div>
		</div>
	</div>
	<div class="column is-1 remove-link-container">
		<a class="delete" href="#" data-action="dynamic-fields#removeFields ">Remove</a>
		<input class="destroy-flag" 
						type="hidden" 
						value="false" 
						name="cafeteria_daily_plan[lunches_attributes][new_record][_destroy]" 
						id="cafeteria_daily_plan_lunches_attributes_new_record__destroy">
</div>
</div>
</div>