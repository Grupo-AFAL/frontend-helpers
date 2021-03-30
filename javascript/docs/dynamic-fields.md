---
title: Dynamic Fields
description: Dynamic Fields component
---

<div data-controller="dynamic-fields" data-dynamic-fields-size="1" data-dynamic-fields-selector=".fields" data-dynamic-fields-remove-duplicates="true">
	<a class="button is-primary" data-dynamic-fields-target="button" href=# data-action="dynamic-fields#addFields">Add</a>
	<template data-dynamic-fields-target="template">
		<div class="columns fields">
			<div class="column is-5">
				<div class="control ">
					<input placeholder="First name" type="text" class="input" name="company[users_attributes][new_record][first_name]" />
				</div>
			</div>
			<div class="column is-5">
				<div class="control ">
					<input placeholder="Last name" type="text" class="input" name="company[users_attributes][new_record][last_name]" />
				</div>
			</div>
			<div class="column is-2 remove-link-container">
				<a class="delete" href="#" data-action="dynamic-fields#removeFields ">Remove</a>
				<input class="destroy-flag" type="hidden" value="false" name="company[users_attributes][new_record][_destroy]">
			</div>
		</div>
	</template>
	<div data-dynamic-fields-target="container">
	</div>
</div>
