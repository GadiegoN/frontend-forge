import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Contact, Flag, Mail, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

export function Home() {
    const [showMore, setShowMore] = useState(false)
    return (
        <div className="w-full max-w-7xl mx-auto gap-16">
            <div className="w-full flex flex-col md:flex-row justify-center items-center shadow-lg bg-secondary rounded-lg relative">
                <div className="flex flex-col px-10 h-96">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 select-none">Eu sou Gadiego Nogueira</h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Desenvolvedor <span className="text-primary">Front-End</span></h2>

                    <p className={!showMore ? "my-4 line-clamp-4 md:line-clamp-2" : "my-4"}>
                        Desenvolvedor Frontend, formado em Sistemas de Informação.
                        Com mais de 4 anos de experiência em desenvolvimento web e mobile,
                        especializado em ReactJS, React Native, Angular, NodeJs e TypeScript.
                        Atualmente, cursando MBA em Engenharia de Software para aprimorar competências
                        técnicas e de gestão.
                    </p>

                    <Button onClick={() => setShowMore(!showMore)} size="sm" variant="outline" className="w-64 mt-10">{!showMore ? "Ler mais..." : "Ler menos"}</Button>
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
                        <p className="text-foreground font-mono">Sites, Blogs, E-commerce</p>
                    </div>
                    <div className="w-full max-w-[300px] hover:scale-105 select-none cursor-pointer bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col justify-center items-center">
                        <Smartphone className="text-primary size-24" />
                        <h3 className="text-lg font-semibold">Desenvolvimento mobile</h3>
                        <p className="text-foreground font-mono">Aplicativos para celular</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col mt-16 border-t">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Escolaridade</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Estas formações combinada com minha experiência prática, me proporcionou uma base sólida
                        e abrangente em desenvolvimento de software, permitindo-me abordar projetos complexos com confiança
                        e competência.
                    </p>
                </div>

                <div className="w-full flex flex-col p-4 items-center gap-4">
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Faculdades Associadas de Uberaba (FAZU)</h3>
                            <p className="text-foreground font-medium">Formado <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Jan 2015 - Jul 2020</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Graduação em Sistemas de Informação</h3>
                            <p className="text-foreground my-4 text-justify">
                                <b>Principais Disciplinas:</b> Algoritmos e Estruturas de Dados, Programação Orientada a Objetos,
                                Desenvolvimento Web, Engenharia de Software, Banco de Dados, Redes de Computadores.
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">MBA USP/Esalq</h3>
                            <p className="text-foreground font-medium">Cursando <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Mai 2024 - Momento</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">MBA em Engenharia de Software</h3>
                            <p className="text-foreground my-4 text-justify">
                                Aprimorando minhas habilidades em tecnologia e programação, bem como aprender sobre conceitos, práticas e ferramentas de DevOps.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col mt-16 border-t">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Experiencias</h2>
                <div className="w-8/12 mx-auto">
                    <p className="text-foreground my-4 text-center">
                        Com uma sólida experiência em desenvolvimento de software, estou sempre em busca de novos desafios e oportunidades
                        para aplicar e expandir minhas habilidades. Meu objetivo é contribuir para o sucesso de projetos e equipes,
                        trazendo soluções inovadoras e eficazes.
                    </p>
                </div>

                <div className="w-full flex flex-col p-4 items-center gap-4">
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Dyndo</h3>
                            <p className="text-foreground font-medium">Tempo Integral <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Jan 2023 - Mai 2024</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Desenvolvedor Web/Mobile</h3>
                            <p className="text-foreground my-4 text-justify">
                                Trabalhei no desenvolvimento de aplicações utilizando ReactJs e React Native, Typescript, TailwindCSS, Styled Components.
                                Desenvolvimento de interfaces de usuário responsivas e acessíveis, garantindo uma experiência de usuário ótima em diferentes dispositivos e navegadores.
                                Uso do GitHub para controle de versão, gerenciando o código fonte de forma eficiente e colaborativa.
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Dyndo</h3>
                            <p className="text-foreground font-medium">Tempo Integral <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Jan 2022 - Jul 2022</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Desenvolvedor Mobile</h3>
                            <p className="text-foreground my-4 text-justify">
                                Fui responsável pela reconstrução de um aplicativo existente que utilizava o framework Quasar, migrando-o para React Native.
                                Essa experiência foi fundamental para desenvolver minhas habilidades em React Native, TypeScript e Styled Components.
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Bravo - Serviços Logísticos</h3>
                            <p className="text-foreground font-medium">Tempo Integral <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Out 2020 - Dez 2021</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Analista de Sistemas</h3>
                            <p className="text-foreground my-4 text-justify">
                                Atuei na manutenção e atualização contínua do código frontend para garantir compatibilidade com as últimas versões do Angular e melhorias na performance.
                                Focando no desenvolvimento de sistemas complexos utilizando algumas versões do Angular no front-end e NodeJs com SQL no back-end,
                                pude aprimorar minhas habilidades em desenvolvimento full stack.
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Dyndo</h3>
                            <p className="text-foreground font-medium">Tempo Integral <span className="font-normal bg-primary px-4 py-1 rounded-full text-white text-sm ml-6">Jun 2019 - Out 2020</span></p>
                        </div>
                        <div className="w-full md:w-6/12">
                            <h3 className="text-lg font-semibold">Desenvolvedor Mobile</h3>
                            <p className="text-foreground my-4 text-justify">
                                Essa experiência foi fundamental para desenvolver minhas habilidades em Vue.js e no uso do framework Quasar.
                                Este projeto envolveu a criação de uma aplicação robusta e responsiva, voltada para fornecer uma excelente experiência ao usuário.
                            </p>
                        </div>
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

                <div className="w-full flex flex-col p-4 items-center gap-4">
                    <div className="w-full justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 items-center gap-4">
                        <div className="w-full select-none bg-card shadow-2xl pb-4 rounded-lg mx-auto flex flex-col justify-center items-center">
                            <img src="/app-links.png" className="w-full h-[300px] object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-center">App links</h3>
                                <p className="text-foreground text-justify">
                                    Sistema de cadastro de links. Utilizei o vite para criar o site em ReactJs com Typescript e TailwindCSS.
                                </p>
                            </div>
                            <div className="w-full flex justify-end gap-4 p-4">
                                <Button variant="outline" asChild><a href="https://github.com/GadiegoN/app-links" target="_blank">Codigo Fonte</a></Button>
                                <Button variant="outline" asChild><a href="https://app-links-psi.vercel.app/" target="_blank">Deploy</a></Button>
                            </div>
                        </div>
                        <div className="w-full select-none bg-card shadow-2xl pb-4 rounded-lg mx-auto flex flex-col justify-center items-center">
                            <img src="/design-system.png" className="w-full h-[300px] object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-center">Design System</h3>
                                <p className="text-foreground text-justify">
                                    Componentes criados isoladamente, criados utilizando Monorepo, Turborepo, Storybook, Typescript, entre outras...
                                </p>
                            </div>
                            <div className="w-full flex justify-end gap-4 p-4">
                                <Button variant="outline" asChild><a href="https://github.com/GadiegoN/05-design-system" target="_blank">Codigo Fonte</a></Button>
                                <Button variant="outline" asChild><a href="https://gadiegon.github.io/05-design-system/" target="_blank">Deploy</a></Button>
                            </div>
                        </div>
                        <div className="w-full select-none bg-card shadow-2xl pb-4 rounded-lg mx-auto flex flex-col justify-center items-center">
                            <img src="/expert-notes.png" className="w-full h-[300px] object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-center">Expert Notes</h3>
                                <p className="text-foreground text-justify">
                                    Sitema Web para criação de notas por texto ou audio. Desenvolvido Utilizando ReactJs com Typescript e TailwindCSS
                                </p>
                            </div>
                            <div className="w-full flex justify-end gap-4 p-4">
                                <Button variant="outline" asChild><a href="https://github.com/GadiegoN/nlw-expert-notes" target="_blank">Codigo Fonte</a></Button>
                                <Button variant="outline" asChild><a href="https://nlw-expert-notes-gadiegon.vercel.app/" target="_blank">Deploy</a></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact" className="flex flex-col md:flex-row">
                <div className="w-full flex flex-col mt-16 border-t">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 select-none text-center">Deixe suas informações</h2>

                    <div className="w-full flex flex-col p-4 items-center gap-4">
                        <div className="w-full justify-center flex flex-wrap items-center gap-4">
                            <div className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col gap-4">
                                <div>
                                    <Label>Nome completo <span className="select-none text-red-500">*</span></Label>
                                    <Input disabled placeholder="Digite seu nome completo" />
                                </div>
                                <div>
                                    <Label>Email <span className="select-none text-red-500">*</span></Label>
                                    <Input disabled placeholder="Digite seu nome completo" />
                                </div>
                                <div>
                                    <Label>Assunto</Label>
                                    <Input disabled placeholder="Digite seu nome completo" />
                                </div>
                                <div>
                                    <Label>Mensagem</Label>
                                    <Textarea disabled placeholder="Digite seu nome completo" />
                                </div>

                                <Button disabled>Enviar mensagem</Button>
                            </div>
                        </div>
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