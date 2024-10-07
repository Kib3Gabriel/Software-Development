// formHandler.test.ts

const handleFormData = (e: Event): Record<string, string> => {
    e.preventDefault();
  
    const data = new FormData(e.target as HTMLFormElement);
    const value = Object.fromEntries(data.entries()) as Record<string, string>;
    return value;
  };
  
  describe("Form submission", () => {
    it("Should handle a form submit", () => {
      const form = document.createElement("form");
  
      form.innerHTML = `
        <input name="name" value="John Doe">
      `;
  
      form.onsubmit = (e) => {
        const value = handleFormData(e);
        expect(value).toEqual({ name: "John Doe" });
      };
  
      // Simulate form submission
      form.requestSubmit();
  
      expect.assertions(1);
    });
  });
  