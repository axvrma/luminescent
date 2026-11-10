---
title: "Form integration"
description: "Native form behavior, with deliberate callback contracts."
---

## Uncontrolled forms

Named native fields work with FormData and browser validation. Uncontrolled Checkbox, Select and TextField use native reset. State-backed Slider, RadioGroup, Rating and Toggle synchronize with the owning form's reset event. Controlled values remain the application's responsibility.

## Callback shapes

TextField, Checkbox and Select pass native React change events. Slider, Rating and Pagination pass numbers. Toggle and Accordion pass booleans. RadioGroup and SegmentedControl pass strings. Tabs uses onValueChange. These differences preserve the existing contracts.

## React Hook Form

Hook-form is not a runtime library dependency. Register native fields directly. Use Controller for boolean/numeric/string callbacks, mapping field.value and field.onChange explicitly. The repository's form integration story demonstrates this pattern.

## Read-only and disabled

Disabled controls are omitted from form data. Read-only TextField, RadioGroup and Toggle keep values without allowing changes. Rating readOnly is a display summary and is not submitted. Native Select has no readOnly semantics; show a summary or use a hidden field deliberately.

## Errors

Pass error to TextField or Select for visible, linked validation text. For groups, link an external error region with aria-describedby and aria-invalid. Keep server validation authoritative.
