import { Button } from "./ui/button";

interface ProjectProps {
    title: string
    description: string
    image: string
    url: string
    previewUrl?: string
}

export function Project({ description, image, title, url, previewUrl }: ProjectProps) {
    return (
        <div className="px-4">
            <div className="w-full select-none bg-card shadow-2xl pb-4 rounded-lg mx-auto flex flex-col justify-center items-center">
                <img src={image} className="w-full h-[300px] object-cover rounded-t-lg" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-center line-clamp-2">{title}</h3>
                    <p className="text-foreground text-justify line-clamp-2">
                        {description}
                    </p>
                </div>
                <div className="w-full flex justify-end gap-4 p-4">
                    <Button variant="outline" asChild><a href={url} target="_blank">Codigo Fonte</a></Button>
                    {previewUrl && <Button variant="outline" asChild><a href={previewUrl} target="_blank">Demonstração</a></Button>}
                </div>
            </div>
        </div>
    )
}