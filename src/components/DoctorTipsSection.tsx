
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Link } from "react-router-dom";


const doctorTips = [
  {
    id: 1,
    title: "Why Flossing is as Important as Brushing",
    description: "Dr. Prabha explains how daily flossing prevents gum disease and tooth decay.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKz9wpYfUyavigCRdSXyS-CwQLjmWjGQTH8Q&s",
    slug: "1"
  },
  {
    id: 2,
    title: "Top 5 Foods That Stain Your Teeth",
    description: "Learn which foods to avoid for a whiter smile.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyef76wUc1ywuU0aYfdaMoBZHWq3EI5rgu_NPpczQsuydG3X3veZYjibW8RmB3TaBvT7Y&usqp=CAU",
    slug: "2"


  },
  {
    id: 3,
    title: "Is Your Toothbrush Too Old?",
    description: "Replace it every 3 months or after an illness.",
    image: "https://static.vecteezy.com/system/resources/previews/017/324/224/non_2x/a-bunch-of-old-worn-out-toothbrushes-with-bent-bristles-on-a-white-background-photo.jpg",
    slug: "3"

  },
  {
    id: 4,
    title: "How to Help Kids Develop Good Oral Habits",
    description: "Make brushing fun and consistent.",
    image: "https://cdn.shopify.com/s/files/1/0661/2113/8345/files/WEB-BANNERS19.jpg?v=1728290727",
    slug: "4"

  }
];

const DoctorTipsSection = () => {
  return (
    <section id="doctor-tips" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">Doctor Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover professional advice from Dr. Prabha to maintain optimal dental health between visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tip.description}</CardDescription>
                {/* <Link to={`/doctorDataTips/${tip.slug}`}> */}

                  <p className="text-dental-blue mt-2 hover:underline">View More</p>
                {/* </Link> */}

              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="text-dental-blue hover:text-blue-700 font-medium inline-flex items-center"
          >
            View all doctor tips
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DoctorTipsSection;
