import { Input } from "../ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { XIcon } from "lucide-react";
import { useAppDispatch } from "@/types/hooks";
import { addBoard } from "@/features/board/boardSlice";

// npx shadcn@latest add [component_name]
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(10, "Title must be at most 10 characters."),
  columns: z.array(
    z.object({
      colName: z
        .string()
        .min(4, "Column name should contain at least 4 characters")
        .max(10, "Column name can contain at most 10 characters"),
    }),
  ),
});
export const AddBoardModal = ({onShowModal}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      columns: [{ colName: "Todo" }, { colName: "Doing" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const dispatch = useAppDispatch();
  function onSubmit(data: z.infer<typeof formSchema>) {
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
      
    // });
    console.log(data);
    dispatch(addBoard(data))
    onShowModal();
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-300 z-10" onClick={() => onShowModal()}>
      <Card className="absolute z-20 w-2/3 sm:max-w-md">
        <CardHeader>
          <CardTitle>Add Board</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Board Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g Web Design"
                      autoComplete="off"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldSet className="gap-4">
              <FieldLegend variant="label">Board Columns</FieldLegend>
              <FieldGroup className="gap-4">
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`columns.${index}.colName`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              {...controllerField}
                              id={`form-rhf-array-email-${index}`}
                              aria-invalid={fieldState.invalid}
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => remove(index)}
                                  aria-label={`Remove column name ${index + 1}`}
                                >
                                  <XIcon />
                                </InputGroupButton>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ colName: "" })}
                  disabled={fields.length >= 5}
                >
                  + Add New Column
                </Button>
                <Button type="submit" variant="outline" size="sm" >
                  Create New Board
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
