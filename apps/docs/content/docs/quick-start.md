---
title: "Quick start"
description: "Build a useful form with native semantics."
---

## Compose a small form

Checkbox, TextField and Select use native input events. Slider and Rating use numeric callbacks; Toggle and Accordion use boolean callbacks. This distinction preserves existing APIs.

```tsx
import { Button, Checkbox, TextField } from "luminescent";
import "luminescent/style.css";

export function Signup() {
  return (
    <form onSubmit={event => {
      event.preventDefault();
      const values = new FormData(event.currentTarget);
      console.log(values.get("email"));
    }}>
      <TextField label="Email" type="email" name="email" autoComplete="email" required />
      <Checkbox label="Send project updates" name="updates" defaultChecked />
      <Button type="submit">Join the workspace</Button>
    </form>
  );
}
```

## Add feedback deliberately

Use inline error messages for fields. Alert announces an application status; Progress describes long-running work. A Toast can confirm a user action without replacing essential information.

## Keep layout in your application

Luminescent does not reset your CSS or impose a page layout. Use CSS grid/flexbox, application spacing, and semantic landmarks around the components. All components support className and style on their documented element.
