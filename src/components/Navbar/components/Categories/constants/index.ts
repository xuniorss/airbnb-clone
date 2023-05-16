import { IconType } from 'react-icons'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

type CategoriesArrayProps = {
   label: string
   icon: IconType
   description: string
}

export const categories: Array<CategoriesArrayProps> = [
   {
      label: 'Praia',
      icon: TbBeach,
      description: 'Esta propriedade fica perto da praia!',
   },
   {
      label: 'Moinhos de vento',
      icon: GiWindmill,
      description: 'Esta propriedade tem moinhos de vento!',
   },
   {
      label: 'Moderno',
      icon: MdOutlineVilla,
      description: 'Esta propriedade é moderna!',
   },
   {
      label: 'Interior',
      icon: TbMountain,
      description: 'Esta propriedade fica no campo!',
   },
   {
      label: 'Piscinas',
      icon: TbPool,
      description: 'Esta propriedade tem uma bela piscina!',
   },
   {
      label: 'Ilhas',
      icon: GiIsland,
      description: 'Esta propriedade fica em uma ilha!',
   },
   {
      label: 'Lago',
      icon: GiBoatFishing,
      description: 'Esta propriedade fica perto de um lago!',
   },
   {
      label: 'Esquiar',
      icon: FaSkiing,
      description: 'Esta propriedade tem atividades de esqui!',
   },
   {
      label: 'Castelos',
      icon: GiCastle,
      description: 'Esta propriedade é um antigo castelo!',
   },
   {
      label: 'Cavernas',
      icon: GiCaveEntrance,
      description: 'Esta propriedade fica em uma caverna assustadora!',
   },
   {
      label: 'Acampamento',
      icon: GiForestCamp,
      description: 'Esta propriedade oferece atividades de acampamento!',
   },
   {
      label: 'Ártico',
      icon: BsSnow,
      description: 'Esta propriedade está no ambiente ártico!',
   },
   {
      label: 'Deserto',
      icon: GiCactus,
      description: 'Esta propriedade fica no deserto!',
   },
   {
      label: 'Celeiros',
      icon: GiBarn,
      description: 'Esta propriedade está em um celeiro!',
   },
   {
      label: 'Luxo',
      icon: IoDiamond,
      description: 'Esta propriedade é nova e luxuosa!',
   },
]
