---
title: "Introduction to @let in Angular 18"
description: "Angular 18 has an exciting new feature under development for developers: the @let directive. This tool will help you create variables quickly and easily within HTML code. It's important to note that this feature is still being developed and has not yet been merged into a release within Angular 18. Let's understand how it works and look at some cool examples of its potential use."
date: "2024-05-21"
tags: ["angular","angular18","front","frontend"]
canonical: "https://dev.to/oler/introduction-to-let-in-angular-18-cm6"
devto: "https://dev.to/oler/introduction-to-let-in-angular-18-cm6"
readingTime: "3 min read"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Feqfajo41fszzi6waf9up.png"
featured: true
---

Angular 18 has an exciting new feature under development for developers: the `@let` directive. This tool will help you create variables quickly and easily within HTML code. It's important to note that **this feature is still being developed and has not yet been merged into a release within Angular 18**. Let's understand how it works and look at some cool examples of its potential use.

Update: According to a comment by Denes Papp on dev.to, the merge has now happened in version 18.1.0, and the `@let` directive is now official. For more details and useful links, you can check out his comment [here](https://dev.to/pppdns/comment/2gj48). Thanks to [Denes](https://dev.to/pppdns) for the update!

### What is `@let`?

The `@let` directive allows you to create variables directly in the HTML code. This means you can do simple operations like joining text or calculations without needing to write more complex code elsewhere in your program.

### How to Use `@let`

Here’s a simple example:

```html
<div>
  @let greeting = 'Hello, ' + name + '!';
  <h1>{{ greeting }}</h1>
</div>
```

In this example, we are creating a variable `greeting` that concatenates the string "Hello, " with the variable `name`, and then we display it on the screen.

### Usage Examples

#### 1. Calculating Total Prices

Imagine you have a list of products and you want to show the total price of each one. You can do it like this:

```html
@for (product of products; track product.id) {
  @let totalPrice = product.price * product.quantity;
  <div>
    <p>{{ product.name }} - Total: {{ totalPrice | currency }}</p>
  </div>
}
```

Here, `totalPrice` is calculated by multiplying the product’s price (`product.price`) by the quantity (`product.quantity`).

#### 2. Formatting Dates

You can format dates easily. Suppose you have a list of events:

```html
@for (event of events; track event.id) {
  @let formattedDate = (new Date(event.date)).toLocaleDateString();
  <div>
    <p>{{ event.name }} - Date: {{ formattedDate }}</p>
  </div>
}
```

Here, `formattedDate` converts the event date (`event.date`) to a more readable format.

#### 3. Showing Messages Based on Conditions

You can create messages based on conditions, like checking if a user is active:

```html
@for (user of users; track user.id) {
  @let statusMessage = user.isActive ? 'Active' : 'Inactive';
  <div>
    <p>{{ user.name }} - Status: {{ statusMessage }}</p>
  </div>
}
```

In this example, `statusMessage` is set to "Active" if the user is active (`user.isActive`), or "Inactive" if not.

### More Complex Examples

#### 4. Calculating Average Grades

Let’s calculate the average grades of students:

```html
@for (student of students; track student.id) {
  @let total = student.grades.reduce((sum, grade) => sum + grade, 0);
  @let average = total / student.grades.length;
  <div>
    <p>{{ student.name }} - Average: {{ average.toFixed(2) }}</p>
  </div>
}
```

Here, we calculate the sum of the grades (`total`) and then the average (`average`), displaying it with two decimal places (`toFixed(2)`).

#### 5. Filtering Items in a List

Suppose you want to show only the available products:

```html
@for (product of products; track product.id) {
  @let isAvailable = product.stock > 0;
  @if (isAvailable) {
    <div>
      <p>{{ product.name }} - In stock: {{ product.stock }}</p>
    </div>
  }
}
```

In this case, `isAvailable` checks if the product has stock (`product.stock > 0`).

### Benefits of `@let` with `| async`

One of the challenges in Angular before the introduction of `@let` was handling asynchronous data, especially when dealing with observables. Typically, you would use the `| async` pipe, but this often required additional directives like `*ngIf` to avoid undefined values, or you had to create extra components or subscribe manually in the TypeScript code.

With `@let`, handling async data becomes more straightforward and elegant:

```html
<div>
  @let data = (data$ | async);
  @let processedData = data ? data.map(item => item.value) : [];
  <ul>
    @for (item of processedData; track item) {
      <li>{{ item }}</li>
    }
  </ul>
</div>
```

Here, `data$` is an observable, and using `@let`, we can directly process the asynchronous data within the template without needing extra directives or subscriptions. The `@let` directive handles the async pipe and processes the data in a more readable and concise way.

### When Not to Use `@let`

Although `@let` is very useful, there are times when it’s not the best choice:

1. **Complex Logic**: If the logic you need is very complicated, it’s better to do it in TypeScript, outside the template.
2. **Reusability**: If you need to use the same logic in multiple places, it’s more efficient to create a function or method in the component.
3. **Performance**: In some situations, especially with many items, `@let` can impact performance. It’s important to test and make sure everything is running fast.

### Conclusion

`@let` in Angular 18 is a powerful and easy-to-use tool that helps simplify code. With it, you can create local variables directly in HTML, making your code cleaner and easier to understand. Use `@let` for simple operations and keep complex logic in TypeScript. This way, you get the best of both worlds!
