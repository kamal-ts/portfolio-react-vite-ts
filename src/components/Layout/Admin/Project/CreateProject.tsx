import React, { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import SubmitButton from "../../../common/Button/SubmitButton";

const CreateProject: React.FC<{ handleEvents: (e: string) => void }> = ({
  handleEvents,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form action="">
      <section className="h-screen w-full bg-white dark:bg-dark absolute flex flex-col justify-between">
        <div className="p-4 border-b flex items-center gap-4">
          <button
            onClick={() => handleEvents("list")}
            className="text-3xl hover:text-main"
          >
            <IoArrowBackCircle />
          </button>
          <h1 className="text-xl font-bold uppercase">Create Your Product</h1>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          <p>Content</p>
          <p className="mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            nulla omnis expedita maiores ipsam in animi vel nam, quasi autem
            inventore quisquam vitae a temporibus totam perferendis asperiores
            tenetur officiis? Unde beatae, expedita dignissimos commodi deserunt
            veniam animi minima nesciunt fugiat earum. Facere eos ipsam sunt vel
            repellendus sint, quisquam quo eum nesciunt earum incidunt corporis
            vero totam asperiores sequi, officiis quidem modi, numquam ipsa
            accusantium quod minus in placeat? Sint placeat repudiandae est quod
            dolorem. Veniam neque beatae corporis voluptatibus labore eligendi
            animi repudiandae facere architecto, dignissimos libero nemo
            voluptas sunt soluta accusamus dolores alias ipsa molestiae
            excepturi repellendus atque. Fugiat laudantium consectetur
            blanditiis. Libero fugit illum iusto cum nemo numquam quasi dolores
            repellendus facere perspiciatis. Ipsam quisquam laboriosam voluptate
            explicabo nemo mollitia eius inventore ducimus quidem vero odio quod
            praesentium quia vel totam et, doloribus beatae earum amet a cum.
            Recusandae earum magni blanditiis a eaque consequatur odit aperiam
            perferendis, quae totam voluptas quidem dicta aliquam, voluptatum
            unde. Deserunt non dolore nobis! Neque modi sed soluta consequatur
            nulla impedit error, dolore labore voluptas voluptate animi. Tempora
            quia nemo veritatis deserunt expedita inventore, quod rerum, minima
            reprehenderit dolore dolorum vero voluptatem repellat, itaque
            quisquam vitae recusandae ut? Dicta perferendis voluptate deserunt
            iure odio. Debitis autem laboriosam optio nihil alias rem hic iste
            omnis reprehenderit ratione accusamus, tempore odio quod error,
            placeat atque officiis aspernatur dignissimos cum voluptatum. Illum
            laudantium aliquid consectetur quia eligendi repellendus nulla
            provident a debitis incidunt similique assumenda necessitatibus id
            ipsum, delectus possimus porro quidem harum est. Earum repellat
            laudantium inventore, consectetur eveniet ullam magni voluptatibus
            error accusantium fugiat eligendi cumque ea facere sequi minima
            similique aspernatur natus rerum maiores quae perspiciatis nisi?
            Quasi quo totam, ab vitae eos magni. Vero qui in odit, consequatur
            ab nulla cumque cum sit! Dolorem nostrum aut qui ad nihil?
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nisi
            qui eum, quasi, fuga impedit unde iure officia animi accusamus
            ipsam, doloremque enim aliquam ratione quaerat culpa! In libero vel
            aut, excepturi rem sed delectus veritatis placeat optio sequi.
            Culpa, ad inventore. Eos magnam, saepe numquam et adipisci sed
            laudantium. Minus officia asperiores nostrum deserunt, reprehenderit
            illo aspernatur omnis! Consequuntur assumenda debitis vero nostrum.
            In, vero. Quidem, quod saepe! Quisquam aspernatur velit dicta
            dolorem quaerat quas. Eum quae aut minus aliquam, dolor ducimus
            voluptatem, odit ipsa sint cumque eligendi id placeat alias fugit?
            Optio eum at magnam magni velit aperiam quo, culpa consequatur
            libero in, quod doloremque a? Architecto voluptas asperiores,
            corrupti similique ducimus a ad soluta praesentium? Nostrum natus
            voluptates voluptatibus nobis quas omnis expedita nisi quam eum
            laborum ducimus, maiores exercitationem repellendus molestias
            aspernatur facilis error nemo non, ratione saepe. Itaque quisquam
            sequi ad beatae perferendis corrupti non deserunt, temporibus
            voluptas esse vero magni vitae blanditiis saepe dignissimos natus
            quia deleniti, amet nisi hic fugit aspernatur aliquid facere
            veritatis. Adipisci ut consequuntur laborum iste nesciunt qui,
            cumque eligendi. Quod exercitationem sed nemo a fuga accusantium
            suscipit libero ab, assumenda rerum. Consequuntur voluptatem dolores
            exercitationem earum ipsam voluptas, quis repellat suscipit incidunt
            sapiente assumenda reprehenderit repellendus. Id eveniet, quidem
            quae amet in ad ex fugit, soluta officiis saepe sit deserunt,
            consequatur reiciendis iure voluptate maiores adipisci voluptates
            velit magni. Doloremque, iste fugit cupiditate animi repudiandae
            sapiente tempore aliquam praesentium. Velit dignissimos quia
            laboriosam exercitationem nulla atque quae saepe! Repellat, quia
            laboriosam repellendus culpa magni repudiandae eum libero
            consectetur unde, atque eaque? Alias eos, commodi voluptatum
            veritatis incidunt, temporibus ab facere placeat necessitatibus ipsa
            expedita. Assumenda eveniet vitae est ipsa beatae? Quae obcaecati
            eum fugiat odio impedit voluptatibus nihil, recusandae laboriosam
            dolores fuga nulla accusantium quia? Eius vitae aspernatur
            voluptates velit, ipsam commodi molestiae iusto ut? Quos,
            repellendus dolorum alias veniam delectus hic beatae. Similique
            reiciendis quibusdam modi, quaerat provident nam ut, ad expedita
            molestiae magnam necessitatibus dolore, voluptate eaque consectetur
            obcaecati magni. Mollitia, quod corrupti accusantium saepe
            praesentium commodi consectetur quaerat, ipsam rerum quae eum
            provident odit. Distinctio, quis deserunt adipisci similique
            molestias earum. Natus odio illo quia aliquam. Minima vitae
            blanditiis amet placeat, fugiat animi enim ipsam voluptates nulla
            perferendis optio porro molestiae cumque facilis adipisci
            exercitationem vel praesentium perspiciatis vero fuga aspernatur
            ratione. Odio perspiciatis molestias mollitia tempora asperiores
            veniam cupiditate porro vel odit consectetur nobis dolorem quae
            quisquam in minima totam nam ad, distinctio ipsam modi alias ut
            natus ipsum aliquam. Quos maiores minima maxime? Repellendus dolores
            quidem corporis ullam perferendis, omnis dolorum officiis provident
            non inventore exercitationem cum, iusto iste aliquam, praesentium
            illo. Sequi doloremque neque ullam incidunt labore consectetur
            expedita nesciunt quisquam minus reprehenderit ex dolorem illo,
            iusto delectus facere iure sapiente saepe earum dicta. Est quas
            quae, temporibus rem ipsa, sit cumque adipisci corrupti nulla
            quaerat sequi libero reiciendis. Harum perferendis vitae provident
            quod, ad sit culpa consectetur ab, sed, veniam omnis doloremque
            numquam. Similique corporis ab voluptatem voluptates quam soluta
            unde vero!
          </p>
        </div>
        <div className="px-2 py-2 border-t w-full flex gap-4 justify-end">
          <button className="bg-mddark rounded-lg w-20">
            Cencel
          </button>
          <div className="w-20">

          <SubmitButton
            isLoading={isLoading}
            titleProses={"Saving..."}
            title="Save"
            />
            </div>
        </div>
      </section>
    </form>
  );
};

export default CreateProject;
