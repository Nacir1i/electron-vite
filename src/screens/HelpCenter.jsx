import Image_Background from "../assets/HelpCenterBackground.png"
import { AiOutlineSearch } from "react-icons/ai";

const HelpCenter = () => {
  return <div className="w-full h-full bg-primary flex flex-col items-center gap-4 p-4">
    <div className="w-5/6 h-fit flex flex-col items-center gap-12 bg-weakest-contrast p-4 py-12 rounded-xl" style={{ filter: "blur(5%)", backgroundImage: `url(${Image_Background})` }}>
      {/* <img src={Image_Background} className="absolute top-0 left-0 w-full h-full" /> */}
      <h1 className="text-white text-4xl font-asap font-bold z-10">Centre d'Assistance</h1>
      <div className="w-3/4 h-fit relative">
        <input type="text" placeholder="Rechercher dans la documentation..." className="w-full bg-secondary text-strong-contrast shadow-md border border-weakest-contrast rounded-xl py-2 pl-4 pr-24 text-base font-roboto z-10" />
        <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl" />
      </div>
    </div>
    <div className="w-full h-fit flex-1 p-4 flex flex-col gap-4">
      <h1 className="text-highlight font-inter text-2xl font-semibold">Questions fréquemment posées</h1>
      <div className="w-full h-full grid grid-cols-2 gap-4 pt-4">
        <ul className="h-full flex flex-col gap-4 pt-4">
          <li className="relative before:content-[''] before:inline-block before:w-0 hover:before:w-full before:border-b-2 before:border-b-highlight before:absolute before:-bottom-2 before:transition-all before:duration-300 cursor-pointer">Qu'est-ce qu'une passerelle de paiement ?</li>
          <li className="relative before:content-[''] before:inline-block before:w-0 hover:before:w-full before:border-b-2 before:border-b-highlight before:absolute before:-bottom-2 before:transition-all before:duration-300 cursor-pointer">Dois-je payer à Instapay même s'il n'y a pas de transaction dans mon entreprise ?</li>
          <li className="relative before:content-[''] before:inline-block before:w-0 hover:before:w-full before:border-b-2 before:border-b-highlight before:absolute before:-bottom-2 before:transition-all before:duration-300 cursor-pointer">Quelles sont les plateformes supportées par la passerelle de paiement Instapay ?</li>
          <li className="relative before:content-[''] before:inline-block before:w-0 hover:before:w-full before:border-b-2 before:border-b-highlight before:absolute before:-bottom-2 before:transition-all before:duration-300 cursor-pointer">Instapay offre-t-il un support pour les paiements internationaux ?</li>
        </ul>
        <div className="h-full flex flex-col gap-8">
          <h1 className="font-inter font-bold text-strong-contrast text-xl">Qu'est-ce qu'une passerelle de paiement ?</h1>
          <p className="text-strong-contrast font-inter font-regular text-base">
            Une passerelle de paiement est un service de commerce électronique qui
            traite les paiements en ligne pour les entreprises en ligne et hors ligne.
            <br />
            Les passerelles de paiement aident à accepter les paiements en transférant les informations clés des sites web des commerçants aux banques émettrices, aux associations de cartes et aux acteurs des portefeuilles en ligne.
            <br />
            Les passerelles de paiement jouent un rôle essentiel dans le processus de transaction en ligne.
            Les passerelles de paiement jouent un rôle essentiel dans le processus de transaction en ligne, qui est la réalisation de la valeur, et sont donc considérées comme un pilier important du commerce électronique.
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default HelpCenter;