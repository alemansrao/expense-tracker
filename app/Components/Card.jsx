import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@heroui/react";
import { Input, Select, SelectItem } from "@heroui/react";
export default function App({ image, title, body, footer }) {
    const animals = [
        { key: 1, label: "Income" },
        { key: 5, label: "Expense" },
    ]
    return (
        <Card className="h-fit">
            <CardHeader className="flex gap-3">
                {image}
                <div className="flex flex-col">
                    <p className="text-md">{title || "Error"}</p>
                    {/* <p className="text-small text-default-500">nextui.org</p> */}
                </div>
                <div className="ml-auto justify-end md:hidden">
                    {footer || <Button variant="bordered" color="primary" className="md:hidden"> Error </Button>}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>


                {body || (<div>Error</div>)}

            </CardBody>
            <Divider className="hidden md:block"></Divider>
            <CardFooter className="justify-center hidden md:flex">
                {footer || <Button variant="bordered" color="primary" className="hidden md:inline-flex"> Error </Button>}
            </CardFooter>
        </Card>
    );
}