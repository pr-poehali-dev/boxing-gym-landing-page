import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const trainers = [
  {
    name: 'Алексей Волков',
    title: 'Главный тренер',
    experience: '15 лет опыта, мастер спорта',
    description: 'Чемпион России по боксу, тренер олимпийского резерва',
    image: 'https://cdn.poehali.dev/projects/09e23db3-1c92-4e98-bc7a-29bec5ee0d4c/files/7d0aa446-2870-42ec-aeea-5c97a48cd0fd.jpg'
  },
  {
    name: 'Мария Соколова',
    title: 'Тренер',
    experience: '8 лет опыта, КМС',
    description: 'Специалист по женскому боксу и функциональной подготовке',
    image: 'https://cdn.poehali.dev/projects/09e23db3-1c92-4e98-bc7a-29bec5ee0d4c/files/b74a389f-73c4-4cce-8680-0ce9ce79edc5.jpg'
  },
  {
    name: 'Дмитрий Орлов',
    title: 'Тренер',
    experience: '12 лет опыта, мастер спорта',
    description: 'Специализация: техника, работа на лапах, спарринги',
    image: 'https://cdn.poehali.dev/projects/09e23db3-1c92-4e98-bc7a-29bec5ee0d4c/files/7d0aa446-2870-42ec-aeea-5c97a48cd0fd.jpg'
  }
];

const schedule = [
  { day: 'Понедельник', morning: 'Начинающие 08:00-09:30', evening: 'Продвинутые 19:00-21:00' },
  { day: 'Вторник', morning: 'Спарринги 08:00-09:30', evening: 'Начинающие 19:00-20:30' },
  { day: 'Среда', morning: 'Начинающие 08:00-09:30', evening: 'Продвинутые 19:00-21:00' },
  { day: 'Четверг', morning: 'Спарринги 08:00-09:30', evening: 'Техника 19:00-20:30' },
  { day: 'Пятница', morning: 'Начинающие 08:00-09:30', evening: 'Продвинутые 19:00-21:00' },
  { day: 'Суббота', morning: 'Открытые тренировки 10:00-12:00', evening: 'Спарринги 16:00-18:00' },
  { day: 'Воскресенье', morning: 'Выходной', evening: 'Выходной' }
];

export default function Index() {
  const [currentTrainer, setCurrentTrainer] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', level: 'beginner' });
  const { toast } = useToast();

  const nextTrainer = () => {
    setCurrentTrainer((prev) => (prev + 1) % trainers.length);
  };

  const prevTrainer = () => {
    setCurrentTrainer((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: `${formData.name}, мы свяжемся с вами в ближайшее время`,
    });
    setIsDialogOpen(false);
    setFormData({ name: '', phone: '', level: 'beginner' });
  };

  return (
    <div className="min-h-screen bg-background font-roboto">
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://cdn.poehali.dev/projects/09e23db3-1c92-4e98-bc7a-29bec5ee0d4c/files/3b452744-8d87-4e08-8f7d-e95f6dfd5046.jpg')` }}
      >
        <div className="text-center z-10 px-4 animate-fade-in">
          <h1 className="font-oswald text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            FIGHT <span className="text-primary">CLUB</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Тренировочный зал бокса для настоящих бойцов
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-oswald text-lg px-8 py-6">
                ЗАПИСАТЬСЯ НА ТРЕНИРОВКУ
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-oswald text-3xl text-foreground">
                  ЗАПИСЬ НА <span className="text-primary">ТРЕНИРОВКУ</span>
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    required
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="bg-muted border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-foreground">Уровень подготовки</Label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-muted border border-border text-foreground rounded-md px-3 py-2"
                  >
                    <option value="beginner">Начинающий</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-oswald text-lg">
                  ОТПРАВИТЬ ЗАЯВКУ
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-white/60" />
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-oswald text-5xl font-bold text-center mb-4 text-foreground">
            НАШИ <span className="text-primary">ТРЕНЕРЫ</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Профессиональные спортсмены с большим опытом
          </p>
          
          <div className="relative">
            <Card className="bg-muted border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-[500px] bg-cover bg-center" 
                    style={{ backgroundImage: `url('${trainers[currentTrainer].image}')` }}
                  />
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="font-oswald text-4xl font-bold text-foreground mb-2">
                      {trainers[currentTrainer].name}
                    </h3>
                    <p className="text-secondary font-semibold text-xl mb-4">
                      {trainers[currentTrainer].title}
                    </p>
                    <p className="text-muted-foreground mb-4 text-lg">
                      {trainers[currentTrainer].experience}
                    </p>
                    <p className="text-foreground text-lg leading-relaxed">
                      {trainers[currentTrainer].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button
              onClick={prevTrainer}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background border-primary"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <Button
              onClick={nextTrainer}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background border-primary"
            >
              <Icon name="ChevronRight" size={24} />
            </Button>

            <div className="flex justify-center gap-2 mt-6">
              {trainers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTrainer(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentTrainer ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-oswald text-5xl font-bold text-center mb-4 text-foreground">
            РАСПИСАНИЕ <span className="text-primary">ТРЕНИРОВОК</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите удобное время для занятий
          </p>

          <div className="grid gap-4">
            {schedule.map((item, idx) => (
              <Card 
                key={idx} 
                className="bg-card border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="font-oswald text-2xl font-bold text-primary">
                      {item.day}
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon name="Sun" size={20} className="text-secondary" />
                      <span>{item.morning}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Icon name="Moon" size={20} className="text-secondary" />
                      <span>{item.evening}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-oswald text-5xl font-bold text-center mb-4 text-foreground">
            КАК НАС <span className="text-primary">НАЙТИ</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Приходите на пробную тренировку
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded">
                  <Icon name="MapPin" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-foreground mb-2">
                    Адрес
                  </h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Спортивная, д. 15
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded">
                  <Icon name="Phone" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-foreground mb-2">
                    Телефон
                  </h3>
                  <p className="text-muted-foreground">
                    +7 (495) 123-45-67
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded">
                  <Icon name="Clock" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-foreground mb-2">
                    Режим работы
                  </h3>
                  <p className="text-muted-foreground">
                    Пн-Сб: 08:00 - 22:00<br />
                    Вс: Выходной
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary p-3 rounded">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-foreground mb-2">
                    Email
                  </h3>
                  <p className="text-muted-foreground">
                    info@fightclub.ru
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[500px] bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A64e34b1b30d4edeb4e0bc86f21a0f49b4086a56f62f0f89a0a8a8c99c5e3b097&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта местоположения"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-background border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Fight Club. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}