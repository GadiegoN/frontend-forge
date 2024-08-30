/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { db } from "@/services/firebase-connection";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ArrowBigDown, Contact, Download, Flag, Mail, Monitor, Smartphone, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ContactInfos } from "@/components/contact";
import Slider from "react-slick";
import { saveAs } from 'file-saver';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "@/components/project";

interface ReviewsProps {
    id: string;
    uid: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    created: Date;
    profile: ProfileProps | null;
}

interface AvatarProps {
    name: string;
    uid: string;
    previewUrl: string;
    url: string;
}

interface ProfileProps {
    id: string;
    uid: string;
    avatar: AvatarProps[];
    name: string;
    about: string;
}


function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", background: "black", borderRadius: 999, alignItems: "center", justifyContent: "center" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", background: "black", borderRadius: 999, alignItems: "center", justifyContent: "center" }}
            onClick={onClick}
        />
    );
}


interface ProjectProps {
    id: string
    title: string
    description: string
    image: string
    url: string
    previewUrl: string
}


const PROJECTS: ProjectProps[] = [
    {
        id: "0001",
        title: "App links",
        description: "Sistema de cadastro de links. Utilizei o vite para criar o site em ReactJs com Typescript e TailwindCSS.",
        image: "/app-links.png",
        url: "https://github.com/GadiegoN/app-links",
        previewUrl: "https://app-links-psi.vercel.app/",
    },
    {
        id: "0002",
        title: "Cardápio Online",
        description: "Landing page para comercio, onde fica disponibilizado todo o cardápio para o cliente poder fazer o pedido e receber em casa. Desenvolvido com HTML, CSS e JavaScript.",
        image: "/menu.png",
        url: "https://github.com/GadiegoN/menu",
        previewUrl: "https://gadiegon.github.io/menu/",
    },
    {
        id: "0003",
        title: "Design System",
        description: "Componentes criados isoladamente, criados utilizando Monorepo, Turborepo, Storybook, Typescript, entre outras...",
        image: "/design-system.png",
        url: "https://github.com/GadiegoN/05-design-system",
        previewUrl: "https://gadiegon.github.io/05-design-system/",
    },
    {
        id: "0004",
        title: "Expert Notes",
        description: "Sitema Web para criação de notas por texto ou audio. Desenvolvido Utilizando ReactJs com Typescript e TailwindCSS.",
        image: "/expert-notes.png",
        url: "https://github.com/GadiegoN/app-links",
        previewUrl: "https://app-links-psi.vercel.app/",
    },
    {
        id: "0005",
        title: "Loja de Legumes",
        description: "Site de vendas de legumes criado em reactjs com typescript e tailwind.",
        image: "/vegetable-store.png",
        url: "https://github.com/GadiegoN/vegetable-store",
        previewUrl: "https://vegetable-store-hazel.vercel.app/",
    },
    {
        id: "0006",
        title: "Serviços Front-end",
        description: "Site de prestação de serviços, desenvolvido utilizando NextJs, typescript, tailwind e CMS para gerenciar o conteudo.",
        image: "/devfront.png",
        url: "https://github.com/GadiegoN/devfront",
        previewUrl: "https://devfront-woad.vercel.app/",
    },
    {
        id: "0007",
        title: "Fina Control",
        description: "Gerencie suas finanças de forma simples e eficiente. Aqui você pode adicionar e monitorar suas transações e acompanhar seu saldo. Explore o dashboard para ter uma visão detalhada de suas entradas e saídas.",
        image: "/fina-control.png",
        url: "https://github.com/GadiegoN/fina-control",
        previewUrl: "https://fina-control.vercel.app/",
    },
]

export function Home() {
    const [reviews, setReviews] = useState<ReviewsProps[]>([])
    const [showMore, setShowMore] = useState(false)
    const [sliderPerView, setSliderPerView] = useState<number>(1)

    const sliderPortifolio = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: sliderPerView,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const sliderSkills = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 0,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    function DownloadPdf() {
        const pdfUrl = "/curriculo.pdf"
        const pdfName = "Curriculo - Gadiego Nogueira"

        saveAs(pdfUrl, pdfName)
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 720) {
                setSliderPerView(1)
            } else {
                setSliderPerView(2)
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        async function loadReviews() {
            const reviewsRef = collection(db, "reviews");
            const queryRef = query(reviewsRef, orderBy("created", "asc"));

            const reviewSnapshots = await getDocs(queryRef);
            const listReviews: ReviewsProps[] = [];

            for (const doc of reviewSnapshots.docs) {
                const reviewData = doc.data();

                const profileRef = collection(db, "profile");
                const profileQueryRef = query(profileRef, where("uid", "==", reviewData.uid));
                const profileSnapshots = await getDocs(profileQueryRef);

                const profileData = profileSnapshots.docs.map(profileDoc => ({
                    id: profileDoc.id,
                    uid: profileDoc.data().uid,
                    avatar: profileDoc.data().avatar,
                    name: profileDoc.data().name,
                    about: profileDoc.data().about,
                }))[0] || null;

                listReviews.push({
                    id: doc.id,
                    name: reviewData.name,
                    uid: reviewData.uid,
                    email: reviewData.email,
                    rating: reviewData.rating,
                    comment: reviewData.comment,
                    created: reviewData.created.toDate(),
                    profile: profileData,
                });
            }

            setReviews(listReviews);
        }

        loadReviews();
    }, []);


    return (
        <div className="w-full max-w-7xl mx-auto gap-16">
            <div className="w-full flex flex-col md:flex-row justify-center items-center shadow-lg bg-secondary rounded-lg relative">
                <div className="flex flex-col px-10 pb-1">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 select-none">Eu sou Gadiego Nogueira</h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Desenvolvedor <span className="text-primary">Front-End</span></h2>

                    <p className={!showMore ? "my-4 line-clamp-4 md:line-clamp-2" : "my-4"}>
                        Desenvolvedor Frontend, formado em Sistemas de Informação.
                        Com mais de 4 anos de experiência em desenvolvimento web e mobile,
                        especializado em ReactJS, React Native, Angular, NodeJs e TypeScript.
                        Atualmente, cursando MBA em Engenharia de Software para aprimorar competências
                        técnicas e de gestão.
                    </p>

                    <div className="flex gap-4 flex-col md:flex-row">
                        <Button onClick={() => setShowMore(!showMore)} size="sm" variant="outline" className="">{!showMore ? "Ler mais..." : "Ler menos"}</Button>
                        <Button size="sm" onClick={DownloadPdf}>Baixar curriculo <Download className="size-4 ml-1" /></Button>
                    </div>
                    <div className="w-10 mx-auto flex mt-4">
                        <ArrowBigDown className="animate-bounce size-6 text-center text-primary" />
                    </div>
                </div>
                <div className="md:flex hidden relative w-full max-w-96 h-96 min-h-64 bg-primary rounded-tl-[290px] rounded-tr-lg rounded-br-lg px-10">
                    <img src="/avatar.png" className="absolute bottom-0 left-0 right-0 h-96 object-cover" alt="" />
                </div>
            </div>

            <div className="w-full flex flex-col mt-16">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Meus serviços</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Estou pronto para contribuir para o sucesso de novos projetos e equipes,
                        trazendo minha experiência e paixão pelo desenvolvimento de software para
                        ajudar a transformar suas ideias em realidade.
                    </p>
                </div>

                <div className="w-full justify-center flex flex-wrap p-4 items-center gap-4">
                    <div className="w-full max-w-[300px] hover:scale-105 select-none cursor-pointer bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                        <Monitor className="text-primary size-24" />
                        <h3 className="text-lg font-semibold">Desenvolvimento web</h3>
                        <p className="text-foreground text-center font-mono">Sites, Blogs, E-commerce, Landing Pages</p>
                    </div>
                    <div className="w-full max-w-[300px] hover:scale-105 select-none cursor-pointer bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                        <Smartphone className="text-primary size-24" />
                        <h3 className="text-lg font-semibold">Desenvolvimento mobile</h3>
                        <p className="text-foreground font-mono">Aplicativos para celular</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col mt-16 border-t">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Portifolio</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Cada projeto representou um desafio único que contribuiu significativamente para meu crescimento profissional e para a entrega de soluções tecnológicas.
                        Estou comprometido em continuar explorando novas tecnologias e metodologias para continuar entregando bons resultados em futuros projetos.
                    </p>
                </div>

                <div className="w-11/12 flex flex-col p-6 items-center gap-4">
                    <Slider className="w-11/12 max-w-7xl" {...sliderPortifolio}>
                        {PROJECTS.map((project) => (
                            <Project
                                key={project.id}
                                description={project.description}
                                title={project.title}
                                image={project.image}
                                url={project.url}
                                previewUrl={project.previewUrl}
                            />
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="w-full flex flex-col mt-16 border-t">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Tecnologias</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Utilizando as tecnologias mais inovadoras e eficientes para construir soluções web e mobile de alta performance.
                    </p>
                </div>

                <Slider className="w-10/12 md:11/12 mx-auto" {...sliderSkills}>
                    <div>
                        <img src="/logo-html.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-css.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-javascript.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-git.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-github.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-typescript.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-react.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                    <div>
                        <img src="/logo-tailwind.png" className="size-12 bg-card rounded-lg p-1" />
                    </div>
                </Slider>
            </div>

            <div className="w-full flex flex-col mt-16">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Avalições</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Estas avaliações não apenas valida meu trabalho,
                        mas também orienta meu compromisso com a excelência
                        no desenvolvimento, garantindo sempre a entrega de
                        resultados que superam expectativas.
                    </p>
                </div>

                <div className="w-full justify-center flex flex-wrap p-4 items-center gap-4">
                    {reviews.map((review) => (
                        <HoverCard key={review.id}>
                            <HoverCardTrigger>
                                <div className="w-full max-w-[300px] select-none cursor-pointer bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                                    <h3 className="text-lg font-semibold">{review.name}</h3>
                                    <p className="text-foreground font-mono">{review.comment}</p>
                                    <span className="text-xl flex">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span key={index}>
                                                {index < review.rating ? "⭐" : <Star className="mt-1" />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-96 min-h-10 mx-auto">
                                {review.profile ? (
                                    <div className="flex gap-4">
                                        {review.profile && review.profile.avatar.length > 0 && (
                                            <img
                                                src={review.profile.avatar[0].url}
                                                alt={review.profile.name}
                                                className="size-16 rounded-full mb-2 object-cover border-2 border-primary"
                                            />
                                        )}
                                        <div>
                                            <p className="font-semibold text-lg">{review.name}</p>
                                            <p className="line-clamp-6">{review.profile.about}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-4">
                                        <User />
                                        <p>{review.name}</p>
                                    </div>
                                )}
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>

            <div id="contact" className="flex flex-col md:flex-row">
                <div className="w-full flex flex-col mt-16 border-t">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Deixe suas informações</h2>

                    <div className="w-full flex flex-col p-4 items-center gap-4">
                        <ContactInfos />
                    </div>
                </div>
                <div className="w-full flex flex-col mt-16 border-t">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Informações de contato</h2>

                    <div className="w-full flex flex-col p-4 items-center gap-4">
                        <div className="w-full justify-center flex flex-wrap p-4 items-center gap-4">
                            <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                                <div className="bg-primary size-10 flex justify-center items-center rounded-full">
                                    <Flag className="text-input size-6" />
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">País:</p>
                                    <p className="text-lg">Brasil</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Estado:</p>
                                    <p className="text-lg">Minas Gerais</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Cidade:</p>
                                    <p className="text-lg">Conquista</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Endereço:</p>
                                    <p className="text-lg">Rua Jose Juliao Tangari, 306</p>
                                </div>
                            </div>
                            <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                                <div className="bg-primary size-10 flex justify-center items-center rounded-full">
                                    <Mail className="text-input size-6" />
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Email:</p>
                                    <p className="text-lg">ngadiego@gmail.com</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Github:</p>
                                    <a target="_blank" href="https://github.com/gadiegon" className="text-lg hover:underline">github.com/GadiegoN</a>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Linkedin:</p>
                                    <a target="_blank" href="https://www.linkedin.com/in/gadiego-nogueira/" className="text-lg hover:underline">linkedin.com/in/gadiegon</a>
                                </div>
                            </div>
                            <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                                <div className="bg-primary size-10 flex justify-center items-center rounded-full">
                                    <Contact className="text-input size-6" />
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Telefone:</p>
                                    <p className="text-lg">+55 34 98408-1905</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="font-medium text-lg">Whatsapp:</p>
                                    <a target="_blank" href="https://wa.me/5534984081905?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os." className="text-lg hover:underline">Enviar mensagem</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}